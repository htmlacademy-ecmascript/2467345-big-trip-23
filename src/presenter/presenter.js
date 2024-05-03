import FilterFuturePresentPast from '../view/FilterFuturePresentPast.js';
import TaxiAmsterdam from '../view/TaxiAmsterdam.js';
import FlightChamonix from '../view/FlihgtChamonix.js';
import TripEvents from '../view/TripEvents.js';
import {render, RenderPosition} from '../render.js';

export default class Presenter {

  constructor() {
    this.tripEvents = document.querySelector('.trip-events');
  }

  renderFilterFuturePresentPast () {
    render(new FilterFuturePresentPast(), this.tripEvents, RenderPosition.AFTERBEGIN);
  }

  renderTaxiAmsterdam () {
    render(new TaxiAmsterdam(), this.tripEvents, RenderPosition.AFTERBEGIN);
  }

  renderFlihgtChamonix () {
    render(new FlightChamonix(), this.tripEvents, RenderPosition.AFTERBEGIN);
  }

  renderTripEvents () {
    render(new TripEvents(), this.tripEvents, RenderPosition.AFTERBEGIN);
  }

  init() {
    this.renderFlihgtChamonix();
    this.renderTaxiAmsterdam();
    this.renderTripEvents();
    this.renderFilterFuturePresentPast();
  }
}
