// eslint-disable-next-line check-file/filename-naming-convention
import { points } from '../mock/Points';
import { destinations } from '../mock/destination';

export default class pointModel {
  constructor() {
    this.points = [];
    this.destinations = [];
  }

  init() {
    this.points = points;
    this.destinations = destinations;
  }

  getPoints() {
    return this.points;
  }

  getDestination() {
    return this.destinations;
  }
}

