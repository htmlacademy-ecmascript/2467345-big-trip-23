//eslint-disable-next-line check-file/filename-naming-convention
const MasCostOffers = ['30', '100', '15', '5', 40];
const MasVariantOffers = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train'];
const MasId = ['luggage', 'comfort', 'meal', 'seats', 'train'];

const CreateOffers = (props, cost, masId) =>
  `<div class="event__available-offers">
	<div class="event__offer-selector">
		<input class="event__offer-checkbox  visually-hidden" id="event-offer-${masId}-1" type="checkbox" name="event-offer-${masId}" checked>
		<label class="event__offer-label" for="event-offer-${masId}-1">
		<span class="event__offer-title">${props}</span>
		&plus;&euro;&nbsp;
		<span class="event__offer-price">${cost}</span>
		</label>
	</div>`;
const MapOffers = MasVariantOffers.map((props, cost, masId)=> CreateOffers(props, MasCostOffers[cost], MasId[masId])).join('');
// eslint-disable-next-line check-file/filename-naming-convention
function offers() {
  return `<section class="event__section  event__section--offers">
						<h3 class="event__section-title  event__section-title--offers">Offers</h3>
						<div class="event__available-offers">
						${MapOffers}
						</div>
					</section>`;
}
export default offers;
