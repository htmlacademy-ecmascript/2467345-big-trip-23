
import { render } from './render.js';
import FilterFuturePresentPast from './view/FilterFuturePresentPast.js';
import TripEvents from './view/trip-event.js';
import TaxiAmsterdam from './view/TaxiAmsterdam.js';
import FlightChamonix from './view/Flihgt-Chamonix.js';

const siteMainElement = document.querySelector('.trip-events');
const siteHeaderElement = siteMainElement.querySelector('.filterFuturePresentPast');

const TripEventConst = siteMainElement.querySelector('.tripEvents');

const TaxiFromAmsterdam = siteMainElement.querySelector('.taxiAmsterdam');

const FlightFromChamonix = siteMainElement.querySelector('.FlightChamonix');

render(new FilterFuturePresentPast(), siteHeaderElement);
render(new TripEvents(), TripEventConst);
render(new TaxiAmsterdam(), TaxiFromAmsterdam);
render(new FlightChamonix(), FlightFromChamonix);

