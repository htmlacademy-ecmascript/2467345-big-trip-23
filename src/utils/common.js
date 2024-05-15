function getRandomArrayElement(items){
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInt(maxInt){
  return Math.floor(Math.random() * maxInt);
}

function updateItem(items, update){
  return items.map((item) => item.id === update.id ? update : item);
}
export {getRandomArrayElement, getRandomInt, updateItem};
