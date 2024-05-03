// eslint-disable-next-line check-file/filename-naming-convention
const masTripSort = ['day', 'event', 'time', 'price', 'offer'];

const createTripSort = (props) =>
  `<div class="trip-sort__item  trip-sort__item--${props}">
	<input id="sort-${props}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${props}" disabled>
	<label class="trip-sort__btn" for="sort-${props}">${props}</label>
</div>`;
const MapCreateTripSort = masTripSort.map((props)=> createTripSort(props)).join('');
function tripSort() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
	 ${MapCreateTripSort}
</form>`;
}
export default tripSort;
