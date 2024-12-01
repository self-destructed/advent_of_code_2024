const data = require('./data.json');

const sortFn = (a, b) => a - b;
const firstArraySorted = data.firstArray.toSorted(sortFn);
const secondArraySorted = data.secondArray.toSorted(sortFn);

const calcTotalDistance = (list1, list2) => {
  return list1.reduce((acc, _, index) => {
    acc += Math.abs(list1[index] - list2[index]);
    return acc;
  }, 0);
};

const answer1 = calcTotalDistance(firstArraySorted, secondArraySorted);
console.log('Answer1: ', answer1);

const countOccurrences = (arr) =>
  arr.reduce((acc, num) => {
    if (acc[num]) {
      acc[num] += 1;
    } else {
      acc[num] = 1;
    }
    return acc;
  }, {});

const calcSimilarityScore = (num, occurencesObj) => {
  const occurences = occurencesObj[num];
  return occurences ? occurences * num : 0;
};

const calcTotalSimilarityScore = (list1, list2) => {
  const arr2Occurrences = countOccurrences(list2);
  const similarityScores = list1.map((num) =>
    calcSimilarityScore(num, arr2Occurrences)
  );
  const sum = similarityScores.reduce((acc, num) => acc + num, 0);
  return sum;
};

const answer2 = calcTotalSimilarityScore(data.firstArray, data.secondArray);
console.log('Answer2: ', answer2);
