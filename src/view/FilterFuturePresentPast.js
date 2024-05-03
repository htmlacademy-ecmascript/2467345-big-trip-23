// eslint-disable-next-line check-file/filename-naming-convention
import { createElement } from '../render';
const masEverythingFuturePresentPast = ['Everything', 'Future', 'Present', 'Past'];

const createEverythingFuturePresentPast = (props) =>
  `<div class="trip-filters__filter">
  <input id="filter-${props}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${props}" checked>
   <label class="trip-filters__filter-label" for="filter-${props}">${props}</label>
  </div>`;
const MapCreateEverythingFuturePresentPast = masEverythingFuturePresentPast.map((props)=> createEverythingFuturePresentPast(props)).join('');
function filterFuturePresentPast() {
  return `<div class="trip-main__trip-controls  trip-controls">
  <div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${MapCreateEverythingFuturePresentPast}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>
</div>`;
}

export default class FilterFuturePresentPast {
  getTemplate() {
    return filterFuturePresentPast();
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
