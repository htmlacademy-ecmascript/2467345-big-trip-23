import ListPresenter from "./presenter/list-presenter.js";
import PointsModel from "./model/points-model.js";
import FilterModel from "./model/filter-model.js";
import FilterPresenter from "./presenter/filter-presenter.js";
import NewPointButtonView from "./view/new-point-view.js";
import { render } from "./framework/render.js";

const siteHeaderElement = document.querySelector(".trip-main");
const siteTripEventsElement = document.querySelector(".trip-events");
const newPointButton = document.querySelector(".trip-main__event-add-btn");
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const listPresenter = new ListPresenter({
  container: siteTripEventsElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});
const filterPresenter = new FilterPresenter({
  filterContainer: siteTripEventsElement,
  filterModel,
  pointsModel,
});

const newPointButtonComponent = new NewPointButtonView({
  button: newPointButton,
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.template.disabled = false;
}

function handleNewPointButtonClick() {
  listPresenter.createPoint();
  newPointButtonComponent.template.disabled = true;
}

filterPresenter.init();
listPresenter.init();
