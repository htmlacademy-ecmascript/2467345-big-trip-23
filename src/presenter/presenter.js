import { points } from '../../mock/Points.js';
import { render, RenderPosition } from '../render.js';
import FilterFuturePresentPast from '../view/FilterFuturePresentPast.js';
import TripEvents from '../view/TripEvents.js';
import TripPointView from '../view/TripPointView.js';
import WayPoint from '../view/waypoint.js';
import TaskListView from '../view/SortView.js';

export default class Presenter {
  boardComponent = new WayPoint();
  TaskListView = new TaskListView();
  constructor({boardContainer, PointModel}) {
    this.boardContainer = boardContainer;
    this.PointModel = PointModel;
  }

  renderBoardComponent () {
    render(this.boardComponent, this.boardContainer);
  }

  renderFilterFuturePresentPast () {
    render(new FilterFuturePresentPast(), this.boardContainer, RenderPosition.AFTERBEGIN);
  }

  renderTripPointView (PointsModels, destination) {
    render(new TripPointView(PointsModels, destination), this.TaskListView, RenderPosition.AFTERBEGIN);
  }

  renderTripEvents () {
    render(new TripEvents(), this.boardContainer, RenderPosition.AFTERBEGIN);
  }


  init() {
    // eslint-disable-next-line no-unused-vars
    const pointsModels = this.PointModel.getPoints();
    const destination = this.PointModel.getDestination();
    this.renderBoardComponent();
    points.forEach((pointsModels, destination) => {
      this.renderTripPointView(pointsModels, destination);
    });
    this.renderTripEvents();
    this.renderFilterFuturePresentPast();
  }
}
