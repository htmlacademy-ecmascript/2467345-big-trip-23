
import { render, RenderPosition } from '../render.js';
import FilterFuturePresentPast from '../view/FilterFuturePresentPast.js';
import TripEvents from '../view/TripEvents.js';
import TripPointView from '../view/TripPointView.js';
import WayPoint from '../view/waypoint.js';
import TaskListView from '../view/SortView.js';

export default class Presenter {
  boardComponent = new WayPoint();
  TaskListView = new TaskListView();
  constructor({boardContainer, pointModel}) {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
    // this.destination = destination;
  }

  renderBoardComponent () {
    render(this.boardComponent, this.boardContainer);
  }

  renderFilterFuturePresentPast () {
    render(new FilterFuturePresentPast(), this.boardContainer, RenderPosition.AFTERBEGIN);
  }

  renderTripEvents () {
    render(new TripEvents(), this.boardContainer, RenderPosition.AFTERBEGIN);
  }


  init() {
    // eslint-disable-next-line no-unused-vars
    const points = this.pointModel.getPoints();
    const destination = this.pointModel.getDestination();
    this.renderBoardComponent();
    points.forEach((point) => {
      render(new TripPointView(point, destination), this.boardContainer);
    });
    this.renderTripEvents();
    this.renderFilterFuturePresentPast();
  }
}
