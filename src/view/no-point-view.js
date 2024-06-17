import AbstractVeiw from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]:
    'click new event to create your first point',
  [FilterType.PAST]: 'there are no past events now',
  [FilterType.PRESENT]: 'there are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

function createNoPointTemplate(filterType) {
  const noPointsTextValue = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">
    ${noPointsTextValue}
    </p>`;
}

export default class NoPointView extends AbstractVeiw {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
