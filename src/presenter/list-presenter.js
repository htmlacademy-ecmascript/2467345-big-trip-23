import { render, remove, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/trip-events-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import FailedLoadView from '../view/failed-load-view';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { sortPointDay, sortPointTime, sortPointPrice } from '../utils/point.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class ListPresenter {
  #container = null;
  #pointsModel = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #filterModel = null;
  #onNewPointDestroy = null;
  #networkError = false;

  #sortView = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #pointListView = new PointListView();
  #loadingComponent = new LoadingView();
  #failedLoadComponent = new FailedLoadView();
  #noPointsView = null;
  #isCreatingNewPoint = false;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #destinations = [];
  #offers = [];

  constructor({ container, pointsModel, filterModel, onNewPointDestroy }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    this.#onNewPointDestroy = onNewPointDestroy;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
    }
    return filteredPoints;
  }

  init() {
    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListView.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewPointDestroy,
      destinationsData: this.#destinations,
      offersData: this.#offers,
    });
    this.#networkError = this.#pointsModel.networkError;

    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    this.#renderMain();
  }

  #renderSort() {
    this.#sortView = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortView, this.#container);
  }

  #renderNewPointPresenter() {
    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListView.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#newPointDestroyHandler,
      destinationsData: this.#destinations,
      offersData: this.#offers,
    });
  }

  #renderPoints(from, to) {
    this.points.slice(from, to).forEach((point) => this.#renderPoint(point));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container, RenderPosition.BEFOREEND);
  }

  #renderFailLoad() {
    render(this.#failedLoadComponent, this.#container, RenderPosition.BEFOREEND);
  }

  #renderNoPoints() {
    this.#noPointsView = new NoPointView({
      filterType: this.#filterType,
    });
    render(this.#noPointsView, this.#container);
  }

  #renderMain() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderSort();
    render(this.#pointListView, this.#container);
    this.#renderNewPointPresenter();

    if (this.points.length === 0) {
      if (this.#isCreatingNewPoint) {
        return;
      }
      if(this.#networkError){
        this.#renderFailLoad();
        return;
      } else{
        this.#renderNoPoints();
        return;
      }
    }
    this.#renderPoints(0, this.points.length);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListView,
      destinationsData: this.#destinations,
      offersData: this.#offers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  createPoint() {
    this.#isCreatingNewPoint = true;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.init();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({
          resetSortType: true,
        });
        this.init();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.init();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderMain();
  };

  #newPointDestroyHandler = () => {
    this.#isCreatingNewPoint = false;

    if (!this.points.length) {
      if(this.#networkError){
        this.#renderFailLoad();
      } else{
        this.#renderNoPoints();
      }
    }

    this.#onNewPointDestroy();
  };

  #clearBoard({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();
    remove(this.#sortView);
    remove(this.#failedLoadComponent);
    remove(this.#loadingComponent);
    if (this.#noPointsView) {
      remove(this.#noPointsView);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
