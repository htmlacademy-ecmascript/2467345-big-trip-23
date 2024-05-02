import FilterFuturePresentPast from '../view/FilterFuturePresentPast.js';
import {render, RenderPosition} from '../render.js';

export default class Presenter {

  constructor() {
    this.tripEvents = document.querySelector('.trip-events');
  }

  renderTripEvent () {
    render(new FilterFuturePresentPast(), this.tripEvents, RenderPosition.AFTERBEGIN);
  }

  init() {
    this.renderTripEvent();
  }
}
