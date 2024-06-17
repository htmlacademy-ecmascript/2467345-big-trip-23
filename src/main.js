import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic FdEuanFU7S4DqYX8';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const siteHeaderElement = document.querySelector('.trip-main');
const siteTripEventsElement = document.querySelector('.trip-events');
const newPointButton = document.querySelector('.trip-main__event-add-btn');
newPointButton.disabled = true;

const pointsApiServise = new PointApiService(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel({pointsApiServise: pointsApiServise});
const filterModel = new FilterModel();

const listPresenter = new ListPresenter({
  container: siteTripEventsElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
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
pointsModel.init()
  .finally(()=>{
    newPointButton.disabled = false;
  });
