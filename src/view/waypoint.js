import { createElement } from '../render';

// eslint-disable-next-line camelcase
function wayPoint() {
  return '<section class="WayPointcontainer"></section>';
}
export default class WayPoint {
  getTemplate() {
    return wayPoint();
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
