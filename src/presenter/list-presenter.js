import {render, replace} from '../framework/render.js';
import PointView from '../view/point';
import SortView from '../view/sort';
import TripEventsListView from '../view/trip-events-list';
import FormEditView from '../view/form-edit';
import NoPointView from '../view/no-point.js';

export default class ListPresenter {
  #container = null;
  #pointsModel = null;

  #tripEventList = new TripEventsListView();

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
    this.#renderList();
  }

  #renderList() {

    render(new SortView(), this.#container);
    render(this.#tripEventList, this.#container);

    if (this.#points.length === 0){
      render(new NoPointView(), this.#tripEventList.element);
      return;
    }

    for(let i = 0; i < this.#points.length; i++){
      this.#renderPoint(this.#points[i], this.#pointsModel);
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      destinationsData: this.#destinations,
      offersData: this.#offers,
    });
    const pointEditComponent = new FormEditView({
      point,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      destinationsData: this.#destinations,
      offersData: this.#offers,
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }
    render (pointComponent, this.#tripEventList.element);
  }
}
