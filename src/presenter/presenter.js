import { render, RenderPosition } from '../render.js';
import FilterFuturePresentPast from '../view/FilterFuturePresentPast.js';
import TripEvents from '../view/TripEvents.js';
import TripPointView from '../view/TripPointView.js';
import { points } from '../../mock/Points.js';
import WayPoint from '../view/waypoint.js';

export default class Presenter {
  boardComponent = new WayPoint();
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  renderBoardComponent () {
    render(this.boardComponent, this.boardContainer);
  }

  renderFilterFuturePresentPast () {
    render(new FilterFuturePresentPast(), this.boardContainer, RenderPosition.AFTERBEGIN);
  }

  renderTripPointView (point) {
    render(new TripPointView(point), this.boardContainer, RenderPosition.AFTERBEGIN);
  }

  renderTripEvents () {
    render(new TripEvents(), this.boardContainer, RenderPosition.AFTERBEGIN);
  }

  init() {
    this.renderBoardComponent();
    points.forEach((point) => {
      this.renderTripPointView(point);
    });
    this.renderTripEvents();
    this.renderFilterFuturePresentPast();
  }
}
