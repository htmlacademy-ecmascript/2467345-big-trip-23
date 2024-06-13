import { getDateTime } from '../utils/point.js';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
const BLANK_POINT = {
  type: 'flight',
  destination: null,
  offers: [],
  basePrice: '0',
  isFavorite: false,
  dateFrom: null,
  dateTo: null,
};

function createFormEditTemplate(data, destinationsData, offersData) {
  const {
    type,
    destination,
    basePrice,
    offers,
    dateFrom,
    dateTo,
    isDisabled,
    isSaving,
    isDeleting,
  } = data;
  const deleteButtonName = isDeleting ? 'Deleting...' : 'Delete';
  const resetButtonName = !data.id ? 'Cancel' : deleteButtonName;
  const pointTypeOffers = offersData.find((offer) => offer.type === type)?.offers || [];
  const dateTimeFrom = getDateTime(dateFrom);
  const dateTimeTo = getDateTime(dateTo);
  const objDestination = destinationsData.find(
    (dest) => dest.id === destination
  ) ?? null;
  function viewPictures() {
    let result = '<div class="event__photos-tape">';
    for (let i = 0; i < objDestination?.pictures.length; i++) {
      result = `${result}<img class="event__photo" src="${objDestination?.pictures[i].src}" alt="${objDestination?.pictures[i].description}">`;
    }
    result = `${result}</div>`;
    return result;
  }

  function viewOffers() {
    let result = '<section class="event__section  event__section--offers"> <h3 class="event__section-title  event__section-title--offers">Offers</h3> <div class="event__available-offers">';
    for (let i = 0; i < pointTypeOffers.length; i++) {
      const { id, title, price } = pointTypeOffers[i];

      let checked = '';
      if (offers.includes(id)) {
        checked = 'checked';
      }
      result = `${result}
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer" value="${id}" ${checked} ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-${id}">
          <span class="event__offer-title">Add ${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>
      `;
    }
    result = `${result}</div></section>`;
    return result;
  }
  function viewTypeEvents() {
    let result = `
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
              `;
    for (let i = 0; i < offersData.length; i++) {
      let checked = '';
      if (type === offersData[i].type) {
        checked = 'checked';
      }
      result = `${result}
      <div class="event__type-item">
        <input id="event-type-${offersData[i].type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offersData[i].type}" ${checked} ${isDisabled ? 'disabled' : ''}>
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

  function viewAbout(){
    const result = `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${
  objDestination === null ? '' : objDestination.description
}</p>
          ${objDestination?.pictures.length === 0 ? '' : `<div class="event__photos-container">
            ${viewPictures()}
          </div>`}
          `;
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
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

          ${viewTypeEvents()}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
  objDestination === null ? '' : he.encode(objDestination.name)
}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          ${viewDestinations()}

        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${he.encode(
    dateTimeFrom
  )}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${he.encode(
    dateTimeTo
  )}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">
        ${isSaving ? 'Saving...' : 'Save'}
        </button>
        <button class="event__reset-btn" type="reset"}>${resetButtonName}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">

          ${pointTypeOffers.length === 0 ? '' : viewOffers()}

          ${objDestination?.pictures.length === 0 && objDestination?.description === '' || !objDestination ? '' : viewAbout()}

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
  #eventStartDatepicker = null;
  #eventEndDatepicker = null;
  #basePrice = '0';

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
    this.#basePrice = point.basePrice;

    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#eventStartDatepicker) {
      this.#eventStartDatepicker.destroy();
      this.#eventStartDatepicker = null;
    }

    if (this.#eventEndDatepicker) {
      this.#eventEndDatepicker.destroy();
      this.#eventEndDatepicker = null;
    }
  }

  _restoreHandlers() {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formClickHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

    const typeInputs = this.element.querySelectorAll('.event__type-input');
    for (let i = 0; i < typeInputs.length; i++) {
      typeInputs[i].addEventListener(
        'change',
        this.#eventTypeInputHandler
      );
    }

    const offers = this.element.querySelectorAll('.event__offer-selector');
    for (let i = 0; i < offers.length; i++) {
      offers[i].addEventListener('change', this.#offerInputHandler);
    }
    const basePriceInput = this.element.querySelector('#event-price-1');
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationInputHandler);
    basePriceInput.addEventListener('change', this.#basePriceInputHandler);
    basePriceInput.addEventListener('keydown', this.#basePricedownHandler);
    this.#setEventStartDatepicker();
    this.#setEventEndDatepicker();
  }

  #offerInputHandler = (evt) => {
    const offerId = evt.target.value;
    const isChecked = evt.target.checked;
    let offers = [...this._state.offers];
    if (isChecked) {
      offers.push(offerId);
    } else {
      offers = offers.filter((id) => id !== offerId);
    }
    this.updateElement({ offers, basePrice: this.#basePrice });
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
    } else{
      this.updateElement({
        destination: this.#destinationsData[0].id,
      });
    }
  };

  #eventStartDatepickerCloseHandler = ([newDate]) => {
    this.updateElement({
      dateFrom: newDate,
    });
  };

  #eventEndDatepickerCloseHandler = ([newDate]) => {
    const startTimeValue = this.element.querySelector('[name="event-start-time"]').value;
    const endTimeValue = this.element.querySelector('[name="event-end-time"]').value;

    if(startTimeValue > endTimeValue){
      this.updateElement({
        dateTo: startTimeValue,
      });
    } else{
      this.updateElement({
        dateTo: newDate,
      });
    }
  };

  #setEventStartDatepicker() {
    this.#eventStartDatepicker = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onClose: this.#eventStartDatepickerCloseHandler,
      },
    );
  }

  #setEventEndDatepicker() {
    this.#eventStartDatepicker = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onClose: this.#eventEndDatepickerCloseHandler,
      },
    );
  }

  #basePricedownHandler = (evt) => {
    const isKeyDigit = /\d/.test(evt.key);
    const isKeyBackspace = evt.key === 'Backspace';
    const isKeyDelete = evt.key === 'Delete';

    if (!(isKeyDigit || isKeyBackspace || isKeyDelete)) {
      evt.preventDefault();
    }
  };

  #basePriceInputHandler = (evt) => {
    const value = evt.target.value || '0';
    const basePrice = parseInt(value, 10);
    this.#basePrice = basePrice;
    this.element.querySelector('.event__input--price').value = basePrice;
    // this.updateElement({ basePrice });

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
    const basePrice = parseInt(this.element.querySelector('.event__input--price').value,10);
    this.updateElement({basePrice: basePrice});
    this.#handleFormSubmit(FormEditView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(FormEditView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return { ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

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
