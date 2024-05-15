import { getRandomPoint, mockDestinations, mockOffers } from '../mock/points';

const POINT_COUNT = 3;

export default class PointsModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #destinations = mockDestinations;
  #offers = mockOffers;

  get destinations(){
    return this.#destinations;
  }

  get offers(){
    return this.#offers;
  }

  get points(){
    return this.#points;
  }
}
