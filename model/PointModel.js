// eslint-disable-next-line check-file/filename-naming-convention
import { points } from '../mock/Points';
import { distinations } from '../mock/distination';

export default class pointModel {
  constructor() {
    this.distinations = [];
    this.points = [];
  }

  init() {
    this.points = points;
    this.distinations = distinations;
  }

  getPoints() {
    return this.points;
  }

  getDestination() {
    return this.distinations;
  }
}

