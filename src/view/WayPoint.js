// eslint-disable-next-line check-file/filename-naming-convention
import {createElement} from '../render.js';

function createWayPoint() {
  return '<section class="WayPoint"></section>';
}

export default class WayPoint {
  getTemplate() {
    return createWayPoint();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
