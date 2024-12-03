const data = require('./data.json');

const REGEXP_PART_1 = /mul\((?<num1>\d{1,3}),(?<num2>\d{1,3})\)/g;

const getMatches = (regexp, str) => {
  return [...str.matchAll(regexp)];
};

const parserFn = (match) => {
  const { num1, num2 } = match.groups;
  return [parseInt(num1, 10), parseInt(num2, 10)];
};

const parseDataFromMatches = (parser, matches) => {
  return matches.map(parser);
};

const mul = (a, b) => a * b;

const add = (a, b) => a + b;

const calcMatches = (matches) => {
  const parsedMatches = parseDataFromMatches(parserFn, matches);
  const mults = parsedMatches.map(([a, b]) => mul(a, b));
  const sum = mults.reduce(add, 0);
  return sum;
};

const first = (string) => {
  const matches = getMatches(REGEXP_PART_1, string);
  return calcMatches(matches);
};

console.log('Answer1: ', first(data));
