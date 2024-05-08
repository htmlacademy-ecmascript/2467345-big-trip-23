import AbstractVeiw from '../framework/view/abstract-view.js';

function createNoPointTemplate(){
  return (
    `<p class="list_no-tasks">
      Click new event to create your first point
    </p>`
  );
}

export default class NoPointView extends AbstractVeiw {
  get template(){
    return createNoPointTemplate();
  }
}
