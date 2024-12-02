const _ = require('lodash/fp');
const data = require('./data.json');

// const data = [
//   [7, 6, 4, 2, 1],
//   [1, 2, 7, 8, 9],
//   [9, 7, 6, 2, 1],
//   [1, 3, 2, 4, 5],
//   [8, 6, 4, 4, 1],
//   [1, 3, 6, 7, 9],
// ];

const isReportOrderAscending = (report) => {
  return report[0] < report[report.length - 1];
};

const isReportSafe = (report) => {
  const isAscending = isReportOrderAscending(report);
  for (let i = 0; i < report.length - 1; i += 1) {
    const diff = report[i] - report[i + 1];
    if ((isAscending && diff > 0) || (!isAscending && diff < 0)) {
      return false;
    }

    const absDiff = Math.abs(diff);
    if (absDiff < 1 || absDiff > 3) return false;
  }

  return true;
};

const getSafeReports = (reports) => {
  return reports.filter(isReportSafe);
};

const first = (reports) => {
  return getSafeReports(reports).length;
};

console.log('Answer1: ', first(data));

const generateSubsets = (array) => {
  return array.map((_item, index) =>
    array.filter((_sameItem, i) => i !== index),
  );
};

const second = (reports) => {
  return reports.filter((report) => {
    return isReportSafe(report) || generateSubsets(report).some(isReportSafe);
  }).length;
};

console.log('Answer2: ', second(data));
