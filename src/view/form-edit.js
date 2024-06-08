import { getDateTime } from "../utils/point.js";
import { getOffersTypeLength } from "../utils/point.js";
import he from "he";

import AbstractStatefulView from "../framework/view/abstract-stateful-view.js";

const BLANK_POINT = {
  id: 0,
  type: "taxi",
  destination: 1,
  offers: [],
  basePrice: "",
  isFavorite: false,
  dateFrom: "2019-07-11T19:00:00",
  dateTo: "2019-07-11T19:00:00",
};

function createFormEditTemplate(data, destinationsData, offersData) {
  const { type, destination, basePrice, offers, dateFrom, dateTo } = data;
  const dateTimeFrom = getDateTime(dateFrom);
  const dateTimeTo = getDateTime(dateTo);
  console.log(data);
  console.log(destinationsData);
  console.log(offersData);
  const objDestination = destinationsData.find(
    (dest) => dest.id === destination
  );
  console.log(objDestination);
  function viewPictures() {
    let result = '<div class="event__photos-tape">';
    for (let i = 0; i < objDestination.pictures.length; i++) {
      result = `${result}<img class="event__photo" src="${objDestination.pictures[i].src}" alt="${objDestination.pictures[i].description}">`;
    }
    result = `${result}</div>`;
    return result;
  }

  function viewOffers() {
    let result = '<div class="event__available-offers">';
    for (let i = 0; i < getOffersTypeLength(type); i++) {
      let checked = "";
      if (offers[i]) {
        checked = "checked";
      }
      const { id, title, price } = offersData.find(
        (offer) => offer.type === type
      ).offers[i];

      result = `${result}
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" ${checked}>
        <label class="event__offer-label" for="event-offer-${title}-${id}">
          <span class="event__offer-title">Add ${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>
      `;
    }
    result = `${result}</div>`;
    return result;
  }
  function viewTypeEvents() {
    let result = `
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
              `;
    for (let i = 0; i < offersData.length; i++) {
      let checked = "";
      if (type === offersData[i].type) {
        checked = "checked";
      }
      result = `${result}
      <div class="event__type-item">
        <input id="event-type-${offersData[i].type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offersData[i].type}" ${checked}>
        <label class="event__type-label  event__type-label--${offersData[i].type}" for="event-type-${offersData[i].type}-1">${offersData[i].type}</label>
      </div>
        `;
    }
    result = `${result}
    </fieldset>
          </div>
    `;
    return result;
  }

  function viewDestinations() {
    let result = '<datalist id="destination-list-1">';
    for (let i = 0; i < destinationsData.length; i++) {
      result = `${result}
          <option value="${destinationsData[i].name}"></option>
        `;
    }
    result = `${result}</datalist>`;
    return result;
  }

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          ${viewTypeEvents()}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(
            objDestination.name
          )}" list="destination-list-1">
          ${viewDestinations()}

        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${he.encode(
            dateTimeFrom
          )}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${he.encode(
            dateTimeTo
          )}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          ${viewOffers()}
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${he.encode(
            objDestination.description
          )}</p>

          <div class="event__photos-container">
            ${viewPictures()}
          </div>
        </section>
      </section>
    </form>
  </li>`;
}

export default class FormEditView extends AbstractStatefulView {
  #point = null;
  #handleFormSubmit = null;
  #handleFormClick = null;
  #handleDeleteClick = null;
  #destinationsData = null;
  #offersData = null;

  constructor({
    point = BLANK_POINT,
    onFormSubmit,
    onFormClick,
    onDeleteClick,
    destinationsData,
    offersData,
  }) {
    super();
    this._setState(FormEditView.parsePointToState(point));
    this.#point = point;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClick = onFormClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#destinationsData = destinationsData;
    this.#offersData = offersData;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element
      .querySelector("form")
      .addEventListener("submit", this.#formSubmitHandler);
    this.element
      .querySelector(".event__rollup-btn")
      .addEventListener("click", this.#formClickHandler);

    this.element
      .querySelector(".event__reset-btn")
      .addEventListener("click", this.#formDeleteClickHandler);

    const typeInputs = this.element.querySelectorAll(".event__type-input");
    for (let i = 0; i < typeInputs.length; i++) {
      typeInputs[i].addEventListener("input", this.#eventTypeInputHandler);
    }

    const offers = this.element.querySelectorAll(".event__offer-checkbox");
    for (let i = 0; i < offers.length; i++) {
      offers[i].addEventListener("input", this.#offerInputHandler);
    }
    this.element
      .querySelector(".event__input--destination")
      .addEventListener("input", this.#destinationInputHandler);
  }

  #offerInputHandler = (evt) => {
    evt.preventDefault();
    //изменять выбранные предложения с помощью id
  };

  #eventTypeInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    const destination = this.#destinationsData.find(
      (item) => item.name === evt.target.value
    );
    if (destination) {
      this.updateElement({
        destination: destination.id,
      });
    }
  };

  reset(point) {
    this.updateElement(FormEditView.parsePointToState(point));
  }

  #formClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClick(this.reset(this.#point));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(FormEditView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    return point;
  }

  get template() {
    return createFormEditTemplate(
      this._state,
      this.#destinationsData,
      this.#offersData
    );
  }
}
