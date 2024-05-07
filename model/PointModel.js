// eslint-disable-next-line check-file/filename-naming-convention
import { points } from '../../mock/points';

export default class PointModel {
  constructor() {
    this.points = [];
  }

  getPoints() {
    this.points = points;
  }
}

