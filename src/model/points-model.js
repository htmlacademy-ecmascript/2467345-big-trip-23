import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  #pointsApiService = null;

  constructor({pointsApiServise}){
    super();
    this.#pointsApiService = pointsApiServise;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      const offers = await this.#pointsApiService.offers;
      const destinations = await this.#pointsApiService.destinations;
      this.#points = points.map(this.#adaptToClient);
      this.#offers = offers;
      this.#destinations = destinations;
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  addPoint(updateType, update) {
    this.#points = [update, ...this.#points];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      basePrice: point['base_price'],
      isFavorite: point['is_favorite'],

    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}