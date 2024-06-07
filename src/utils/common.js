function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInt(maxInt) {
  return Math.floor(Math.random() * maxInt);
}

export { getRandomArrayElement, getRandomInt };
