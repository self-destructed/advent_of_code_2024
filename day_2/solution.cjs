const _ = require('lodash/fp');
const data = require('./data.json');

const isOrderAscending = (array) => _.lt(_.head(array), _.last(array));

const isPairSafe = (prev, next, isAscending, min = 1, max = 3) => {
  const diff = prev - next;
  const absDiff = Math.abs(diff);

  return (
    (isAscending ? diff < 0 : diff > 0) && absDiff >= min && absDiff <= max
  );
};

const isReportSafe = (report) => {
  const isAscending = isOrderAscending(report);
  for (let i = 0; i < report.length - 1; i += 1) {
    if (!isPairSafe(report[i], report[i + 1], isAscending)) {
      return false;
    }
  }

  return true;
};

const first = (reports) => {
  return reports.filter(isReportSafe).length;
};

console.log('Answer1: ', first(data));

const generateSubsets = (array) => {
  return array.map((_item, index) => [
    ...array.slice(0, index),
    ...array.slice(index + 1),
  ]);
};

const isReportSafeWithRemoval = (report) => {
  return isReportSafe(report) || generateSubsets(report).some(isReportSafe);
};

const second = (reports) => {
  return reports.filter(isReportSafeWithRemoval).length;
};

console.log('Answer2: ', second(data));
