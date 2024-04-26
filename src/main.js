
import FilterFuturePresentPast from './view/FilterFuturePresentPast.js';
import {render} from './render.js';

const siteMainElement = document.querySelector('.trip-events');
const siteHeaderElement = siteMainElement.querySelector('.filterFuturePresentPast');

render(new FilterFuturePresentPast(), siteHeaderElement);
