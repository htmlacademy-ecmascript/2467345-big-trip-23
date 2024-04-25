import { render } from '../render';
import PointView from '../view/point';
import SortView from '../view/sort';
import TripEventsListView from '../view/trip-events-list';
import FormEditView from '../view/form-edit';
import FormAddView from '../view/form-add';

export default class ListPresenter {
  tripEventList = new TripEventsListView();

  constructor({countainer}){
    this.countainer = countainer;
  }

  init(){
    render(new SortView(), this.countainer);
    render(this.tripEventList, this.countainer);
    render(new FormAddView(), this.tripEventList.getElement());
    render(new FormEditView(), this.tripEventList.getElement());
    for(let i = 0; i < 3; i++){
      render(new PointView(), this.tripEventList.getElement());
    }
  }
}
