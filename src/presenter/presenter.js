import { RenderPosition } from '../render'

export default class Presenter {
constructor() {
	this.filterFuturePresentPast = document.querySelector('.filterFuturePresentPast'),
}
renderFilterFuturePresentPast(){
render(new FilterFuturePresentPast, this.filterFuturePresentPast, RenderPosition.AFTERBEGIN)
}
}