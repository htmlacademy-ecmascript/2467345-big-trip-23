import {render} from '../framework/render.js';
import SortView from '../view/sort';
import PointListView from '../view/point-list.js';
import NoPointView from '../view/no-point.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';

export default class ListPresenter {
  #container = null;
  #pointsModel = null;
  #pointPresenters = new Map();

  #pointListView = new PointListView();
  #sortView = new SortView();
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
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    this.#renderMain();
  }

  #renderSort() {
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

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
