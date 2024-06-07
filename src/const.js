const POINT_TYPES = [
  "Taxi",
  "Bus",
  "Train",
  "Ship",
  "Drive",
  "Flight",
  "Check-in",
  "Sightseeing",
  "Restaurant",
];

const FilterType = {
  EVERYTHING: "everything",
  FUTURE: "future",
  PRESENT: "present",
  PAST: "past",
};
const SortType = {
  DAY: "day",
  TIME: "time",
  PRICE: "price",
};

const UserAction = {
  UPDATE_POINT: "UPDATE_POINT",
  ADD_POINT: "ADD_POINT",
  DELETE_POINT: "DELETE_POINT",
};

const UpdateType = {
  PATCH: "PATCH",
  MINOR: "MINOR",
  MAJOR: "MAJOR",
};

export { POINT_TYPES, FilterType, SortType, UserAction, UpdateType };
