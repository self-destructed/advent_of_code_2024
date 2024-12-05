const data = require('./data.json');

const pagesOrderSample = [
  [47, 53],
  [97, 13],
  [97, 61],
  [97, 47],
  [75, 29],
  [61, 13],
  [75, 53],
  [29, 13],
  [97, 29],
  [53, 29],
  [61, 53],
  [97, 53],
  [61, 29],
  [47, 13],
  [75, 47],
  [97, 75],
  [47, 61],
  [75, 61],
  [47, 29],
  [75, 13],
  [53, 13],
];

const updatesSample = [
  [75, 47, 61, 53, 29],
  [97, 61, 53, 29, 13],
  [75, 29, 13],
  [75, 97, 47, 61, 53],
  [61, 13, 29],
  [97, 13, 75, 29, 47],
];

const createIndexesMap = (arr) => {
  const map = new Map();

  arr.forEach((element, index) => {
    map.set(element, index);
  });

  return map;
};

const isValidPageOrder = (updateIndexesMap, pageOrder) => {
  const [firstPageNum, secondPageNum] = pageOrder;

  if (
    updateIndexesMap.has(firstPageNum) &&
    updateIndexesMap.has(secondPageNum)
  ) {
    return (
      updateIndexesMap.get(firstPageNum) < updateIndexesMap.get(secondPageNum)
    );
  }
  return true;
};

const isValidUpdate = (pageOrders, update) => {
  const indexesMap = createIndexesMap(update);

  return pageOrders.every((pageOrder) => {
    return isValidPageOrder(indexesMap, pageOrder);
  });
};

const getMiddleElement = (arr) => {
  if (arr.length === 0) {
    return null;
  }

  const midIndex = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    return (arr[midIndex - 1] + arr[midIndex]) / 2;
  }

  return arr[midIndex];
};

const first = (pages, updates) => {
  return updates
    .filter((upd) => isValidUpdate(pages, upd))
    .map(getMiddleElement)
    .reduce((a, b) => a + b, 0);
};

const swap = (arr, index1, index2) => {
  const copy = arr;
  [copy[index1], copy[index2]] = [copy[index2], copy[index1]];
};

const fixOrder = (updateIndexesMap, update, pageOrder) => {
  const [firstPageNum, secondPageNum] = pageOrder;
  // console.log(update);
  if (
    updateIndexesMap.has(firstPageNum) &&
    updateIndexesMap.has(secondPageNum)
  ) {
    swap(
      update,
      updateIndexesMap.get(firstPageNum),
      updateIndexesMap.get(secondPageNum),
    );
  }
  // console.log(update, 'a');
};

const second = (pages, updates) => {
  const incorrectUpdates = updates.filter((upd) => !isValidUpdate(pages, upd));
  const fixed = incorrectUpdates.slice();

  fixed.forEach((update) => {
    const indexesMap = createIndexesMap(update);

    pages.forEach((pageOrder) => {
      if (!isValidPageOrder(indexesMap, pageOrder)) {
        fixOrder(indexesMap, update, pageOrder);
      }
    });
  });

  const sum = fixed.map(getMiddleElement).reduce((a, b) => a + b, 0);

  return sum;
};

// console.log(first(pagesOrderSample, updatesSample));
console.log(second(pagesOrderSample, updatesSample));
// console.log(first(data.pages, data.updates));
console.log(second(data.pages, data.updates));
