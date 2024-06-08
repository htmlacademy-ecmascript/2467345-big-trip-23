import { render, remove } from "../framework/render.js";
import SortView from "../view/sort";
import PointListView from "../view/point-list.js";
import NoPointView from "../view/no-point.js";
import PointPresenter from "./point-presenter.js";
import { SortType, UserAction, UpdateType, FilterType } from "../const.js";
import { sortPointDay, sortPointTime, sortPointPrice } from "../utils/point.js";
import { filter } from "../utils/filter.js";
import NewPointPresenter from "./new-point-presenter.js";

export default class ListPresenter {
  #container = null;
  #pointsModel = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #filterModel = null;

  #sortView = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #pointListView = new PointListView();
  #noPointsView = null;

  #destinations = [];
  #offers = [];

  constructor({ container, pointsModel, filterModel, onNewPointDestroy }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListView.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      destinationsData: this.#destinations,
      offersData: this.#offers,
    });

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

  #renderPoints(from, to) {
    this.points.slice(from, to).forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    this.#noPointsView = new NoPointView({
      filterType: this.#filterType,
    });
    render(this.#noPointsView, this.#pointListView.element);
  }

  #renderPointList() {
    render(this.#pointListView, this.#container);
    this.#renderPoints(0, this.points.length);
  }

  #renderMain() {
    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
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
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderMain();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({
          resetSortType: true,
        });
        this.#renderMain();
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
    this.#clearBoard({ resetRenderedTaskCount: true });
    this.#renderMain();
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  };

  #clearBoard({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();
    remove(this.#sortView);
    remove(this.#noPointsView);
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }
}
