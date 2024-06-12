import { render, replace, remove } from '../framework/render';
import PointView from '../view/point';
import FormEditView from '../view/form-edit';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #formEditComponent = null;
  #point = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  #destinations = [];
  #offers = [];

  constructor({
    pointListContainer,
    destinationsData,
    offersData,
    onDataChange,
    onModeChange,
  }) {
    this.#pointListContainer = pointListContainer.element;
    this.#destinations = destinationsData;
    this.#offers = offersData;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
      destinationsData: this.#destinations,
      offersData: this.#offers,
    });
    this.#formEditComponent = new FormEditView({
      point: this.#point,
      onFormClick: this.#handleFormClick,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      destinationsData: this.#destinations,
      offersData: this.#offers,
    });

    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#formEditComponent, prevFormEditComponent);
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#formEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#formEditComponent);
  }

  #replaceCardToForm() {
    replace(this.#formEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#formEditComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#formEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate = !isDatesEqual(this.#point.dueDate, update.dueDate);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    this.#replaceFormToCard();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };

  #handleFormClick = () => {
    this.#replaceFormToCard();
  };
}
