const data = require('./data.json');

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

console.log('Answer1: ', first(data.pages, data.updates));

const topologicalSort = (pages, update) => {
  const graph = new Map();
  const inDegree = new Map();

  // Initialize the graph and in-degree map
  update.forEach((page) => {
    graph.set(page, []);
    inDegree.set(page, 0);
  });

  // Build the graph and calculate in-degrees for the current update
  pages.forEach(([firstPage, secondPage]) => {
    if (update.includes(firstPage) && update.includes(secondPage)) {
      graph.get(firstPage).push(secondPage);
      inDegree.set(secondPage, inDegree.get(secondPage) + 1);
    }
  });

  // Perform topological sorting using a queue
  const queue = [];
  inDegree.forEach((degree, node) => {
    if (degree === 0) {
      queue.push(node);
    }
  });

  const sorted = [];
  while (queue.length > 0) {
    const node = queue.shift();
    sorted.push(node);

    graph.get(node).forEach((neighbor) => {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    });
  }

  return sorted;
};

const second = (pages, updates) => {
  const incorrectUpdates = updates.filter((upd) => !isValidUpdate(pages, upd));

  // Fix each incorrect update
  const fixed = incorrectUpdates.map((update) =>
    topologicalSort(pages, update),
  );

  // Calculate the sum of middle elements
  const sum = fixed.map(getMiddleElement).reduce((a, b) => a + b, 0);

  return sum;
};

console.log('Answer2: ', second(data.pages, data.updates));
