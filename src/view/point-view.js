import {
  humanizePointDueDate,
  getTimeFromDate,
  dateDiff,
  isFavoriteStyle,
} from '../utils/point.js';
import AbstractVeiw from '../framework/view/abstract-view.js';
import he from 'he';

function createPointTemplate(point, destinationsData, offersData) {
  const { type, destination, basePrice, offers, isFavorite, dateFrom, dateTo } =
    point;

  const pointTypeOffers = offersData.find((offer) => offer.type === type)?.offers || [];

  const dateFromHumanize = humanizePointDueDate(dateFrom);
  const timeFrom = getTimeFromDate(dateFrom);
  const timeTo = getTimeFromDate(dateTo);
  const objDestination = destinationsData.find(
    (dest) => dest.id === destination
  );
  const duration = dateDiff(dateFrom, dateTo);

  function viewOffers() {
    let result = '<ul class="event__selected-offers">';
    for (let i = 0; i < offers.length; i++) {
      const { title, price } = pointTypeOffers.find((offer) => offer.id === offers[i]);
      result = `${result}
      <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>
      `;
    }
    result = `${result}
      </ul>
      `;

    return result;
  }

  return `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${he.encode(
    dateFromHumanize
  )}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${he.encode(type)} ${he.encode(
  objDestination.name
)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T14:30">${he.encode(
    timeFrom
  )}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T16:05">${he.encode(
    timeTo
  )}</time>
          </p>
          <p class="event__duration">${he.encode(duration)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${viewOffers()}

        <button class="event__favorite-btn  event__favorite-btn${isFavoriteStyle(
    isFavorite
  )}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
}

export default class PointView extends AbstractVeiw {
  #point = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;
  #destinationsData = null;
  #offersData = null;

  constructor({
    point,
    onEditClick,
    onFavoriteClick,
    destinationsData,
    offersData,
  }) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#destinationsData = destinationsData;
    this.#offersData = offersData;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  get template() {
    return createPointTemplate(
      this.#point,
      this.#destinationsData,
      this.#offersData
    );
  }
}
