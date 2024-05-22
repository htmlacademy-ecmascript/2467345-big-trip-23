import {render} from '../framework/render.js';
import SortView from '../view/sort';
import PointListView from '../view/point-list.js';
import NoPointView from '../view/no-point.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPointDay, sortPointTime, sortPointPrice } from '../utils/point.js';

export default class ListPresenter {
  #container = null;
  #pointsModel = null;
  #pointPresenters = new Map();
  #sourcedPoints = [];


  #sortView = null;
  #currentSortType = SortType.DAY;
  #pointListView = new PointListView();
  #noPointsView = new NoPointView();

  #points = [];
  #destinations = [];
  #offers = [];

  constructor({container, pointsModel}){
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init(){
    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];

    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    this.#renderMain();
  }

  #renderSort() {
    this.#sortView = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortView, this.#container);
  }

  #renderPoints(from, to){
    this.#points
      .slice(from,to)
      .forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints(){
    render(this.#noPointsView, this.#pointListView.element);
  }

  #renderPointList() {
    render(this.#pointListView, this.#container);
    this.#renderPoints(0,this.#points.length);
  }

  #renderMain(){

    if (this.#points.length === 0){
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
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortPointDay);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointPrice);
        break;
      case SortType.TIME:
        this.#points.sort(sortPointTime);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType){
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
