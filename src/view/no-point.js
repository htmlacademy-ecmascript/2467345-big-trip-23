import AbstractVeiw from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]:
    'Click «ADD NEW EVENT» in menu to create your first event',
  [FilterType.PAST]: 'There are no overdue events now',
  [FilterType.PRESENT]: 'There are no events today',
  [FilterType.FUTURE]: 'There are no future events now',
};

function createNoPointTemplate(filterType) {
  const noPointsTextValue = NoPointsTextType[filterType];
  return `<p class="list_no-tasks">
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
