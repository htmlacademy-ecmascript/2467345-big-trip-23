import FilterFuturePresentPast from '../view/FilterFuturePresentPast.js';
import TripEvents from '../view/TripEvents.js';
import {render, RenderPosition} from '../render.js';
import TripPointView from '../view/TripPointView.js';

export default class Presenter {

  constructor() {
    this.tripEvents = document.querySelector('.trip-events');
  }

  renderFilterFuturePresentPast () {
    render(new FilterFuturePresentPast(), this.tripEvents, RenderPosition.AFTERBEGIN);
  }

  renderTripPointView (i) {
    render(new TripPointView(i), this.tripEvents, RenderPosition.AFTERBEGIN);
  }

  renderTripEvents () {
    render(new TripEvents(), this.tripEvents, RenderPosition.AFTERBEGIN);
  }

  init() {
    for(let i = 0; i < 3; i++) {
      this.renderTripPointView(i);
    }
    this.renderTripEvents();
    this.renderFilterFuturePresentPast();
  }
}
