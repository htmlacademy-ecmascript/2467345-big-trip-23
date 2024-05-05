import { render } from '../render';
import PointView from '../view/point';
import SortView from '../view/sort';
import TripEventsListView from '../view/trip-events-list';
import FormEditView from '../view/form-edit';

export default class ListPresenter {
  tripEventList = new TripEventsListView();

  constructor({countainer, pointsModel}){
    this.countainer = countainer;
    this.pointsModel = pointsModel;
  }

  init(){
    this.points = [...this.pointsModel.getPoints()];

    render(new SortView(), this.countainer);
    render(this.tripEventList, this.countainer);
    render(new FormEditView({}), this.tripEventList.getElement());
    render(new FormEditView({point: this.points[0]}), this.tripEventList.getElement());
    for(let i = 1; i < this.points.length; i++){
      render(new PointView({point: this.points[i]}), this.tripEventList.getElement());
    }
  }
}
