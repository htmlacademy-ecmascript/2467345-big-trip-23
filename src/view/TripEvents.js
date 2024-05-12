// eslint-disable-next-line check-file/filename-naming-convention
import { createElement } from '../render';
import offers from './Offers';
import tripSort from './TripSort';
const MasEventTypeList = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const CreateEventTypeList = (props) =>
  `<div class="event__type-item">
<input id="event-type-${props}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${props}">
<label class="event__type-label  event__type-label--${props}" for="event-type-${props}-1">${props}</label>
</div>`;

const MapEventTypeList = MasEventTypeList.map((props)=> CreateEventTypeList(props)).join('');
// eslint-disable-next-line camelcase
function tripEvents(destinations, point) {
  // eslint-disable-next-line no-shadow
  const currntDestinations = destinations.find((destinations) => destinations.id === point.destination);
  return `<section class="trip-events">
	<h2 class="visually-hidden">Trip events</h2>
	${tripSort()}
	<ul class="trip-events__list">
		<li class="trip-events__item">
			<form class="event event--edit" action="#" method="post">
				<header class="event__header">
					<div class="event__type-wrapper">
						<label class="event__type  event__type-btn" for="event-type-toggle-1">
							<span class="visually-hidden">Choose event type</span>
							<img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
						</label>
						<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

						<div class="event__type-list">
							<fieldset class="event__type-group">
								<legend class="visually-hidden">Event type</legend>
									${MapEventTypeList}
							</fieldset>
						</div>
					</div>

					<div class="event__field-group  event__field-group--destination">
						<label class="event__label  event__type-output" for="event-destination-1">
							Flight
						</label>
						<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
						<datalist id="destination-list-1">
							<option value="${currntDestinations.name}"></option>
							<option value=${currntDestinations.name}></option>
							<option value=${currntDestinations.name}></option>
						</datalist>
					</div>

					<div class="event__field-group  event__field-group--time">
						<label class="visually-hidden" for="event-start-time-1">From</label>
						<input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
						&mdash;
						<label class="visually-hidden" for="event-end-time-1">To</label>
						<input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
					</div>

					<div class="event__field-group  event__field-group--price">
						<label class="event__label" for="event-price-1">
							<span class="visually-hidden">Price</span>
							&euro;
						</label>
						<input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
					</div>

					<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
					<button class="event__reset-btn" type="reset">Cancel</button>
				</header>
				${offers()}
			</form>
		</li>`;
}

// eslint-disable-next-line camelcase
export default class TripEvents {
  constructor(destinations, point) {
    this.destinations = destinations;
    this.point = point;
  }

  getTemplate() {
    return tripEvents(this.destinations, this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
