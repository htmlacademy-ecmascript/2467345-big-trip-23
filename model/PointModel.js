// eslint-disable-next-line check-file/filename-naming-convention
import { points } from '../mock/Points';
import { destination } from '../mock/destination';

export default class pointModel {
  constructor() {
    this.points = [];
    this.destination = [];
  }

  init() {
    this.points = points;
    this.destination = destination;
  }

  getPoints() {
    return this.points;
  }

  getDestination() {
    return this.destination;
  }
}

