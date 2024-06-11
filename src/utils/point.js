import dayjs from 'dayjs';
import { mockOffers } from '../mock/points';

const DATE_FORMAT = 'D MMMM';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function getTimeFromDate(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

function getDateTime(date) {
  return date ? dayjs(date).format(DATE_TIME_FORMAT) : '';
}

function dateDiff(dateFrom, dateTo) {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);

  let minutes = date2.diff(date1, 'minute');
  let hours = Math.floor(minutes / 60);
  const days = Math.floor(minutes / (24 * 60));
  hours = hours - days * 24;
  minutes = minutes - hours * 60;

  const daysStr = days !== 0 ? `${days}D` : '';
  const hoursStr = hours !== 0 ? `${hours}H` : '';

  return `${daysStr + hoursStr + minutes}M`;
}

function isFavoriteStyle(isFavorite) {
  return isFavorite === true ? '--active' : '';
}

function getOffersTypeLength(type) {
  return mockOffers.find((offer) => offer.type === type).offers.length;
}

function isFuture(point) {
  if (dayjs(point.dateTo) < dayjs()) {
    return true;
  } else {
    return false;
  }
}
function isPresent(point) {
  if (dayjs(point.dateFrom) < dayjs() && dayjs(point.dateTo) > dayjs()) {
    return true;
  } else {
    return false;
  }
}
function isPast(point) {
  if (dayjs(point.dateFrom) > dayjs()) {
    return true;
  } else {
    return false;
  }
}

/**
 * for sort functions.
 * @param varA - first object to compare.
 * @param varB - second object to compare.
 */
function getWeightForNull(varA, varB) {
  if (varA === null && varB === null) {
    return 0;
  }

  if (varA === null) {
    return 1;
  }

  if (varB === null) {
    return -1;
  }

  return null;
}

function sortPointDay(pointA, pointB) {
  const weight = getWeightForNull(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointTime(pointA, pointB) {
  const timeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  const weight = getWeightForNull(timeA, timeB);

  return weight ?? timeB - timeA;
}

function sortPointPrice(pointA, pointB) {
  const weight = getWeightForNull(pointA.basePrice, pointB.basePrice);

  return weight ?? pointB.basePrice - pointA.basePrice;
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}
export {
  humanizeTaskDueDate,
  getTimeFromDate,
  dateDiff,
  isFavoriteStyle,
  getDateTime,
  getOffersTypeLength,
  isPast,
  isPresent,
  isFuture,
  sortPointDay,
  sortPointTime,
  sortPointPrice,
  isDatesEqual,
};
