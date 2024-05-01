import { render } from './render';
import FiltersView from './view/filters.js';
import ListPresenter from './presenter/list-presenter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteTripEventsElement = document.querySelector('.trip-events');
const presenter = new ListPresenter({countainer: siteTripEventsElement});

render(new FiltersView(), siteHeaderElement);
presenter.init();
