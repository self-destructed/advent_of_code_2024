const _ = require('lodash/fp');
const data = require('./data.json');

const sortArray = _.sortBy(_.identity);

const firstArraySorted = sortArray(data.firstArray);
const secondArraySorted = sortArray(data.secondArray);

const calcDifference = (a, b) => Math.abs(a - b);

const calcTotalDistance = _.flow(_.zipWith(calcDifference), _.sum);

const answer1 = calcTotalDistance(firstArraySorted, secondArraySorted);
console.log('Answer1: ', answer1);

const countOccurrences = _.countBy(_.identity);

const calcSimilarityScore = (occurencesObj) => (num) =>
  num * _.getOr(0, num, occurencesObj);

const calcTotalSimilarityScore = (list1, list2) => {
  const occurrences = countOccurrences(list2);
  return _.flow(_.map(calcSimilarityScore(occurrences)), _.sum)(list1);
};

const answer2 = calcTotalSimilarityScore(data.firstArray, data.secondArray);
console.log('Answer2: ', answer2);
