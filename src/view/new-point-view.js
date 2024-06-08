import AbstractView from "../framework/view/abstract-view.js";

export default class NewPointButtonView extends AbstractView {
  #handleClick = null;
  #button = null;

  constructor({ button, onClick }) {
    super();
    this.#button = button;
    this.#handleClick = onClick;
    this.#button.addEventListener("click", this.#clickHandler);
  }

  get template() {
    return this.#button;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
