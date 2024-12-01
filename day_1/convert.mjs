const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');

const lines = data.trim().split('\n');
const firstArray = [];
const secondArray = [];

lines.forEach((line) => {
  const [first, second] = line.trim().split(/\s+/);
  firstArray.push(Number(first));
  secondArray.push(Number(second));
});

const outputData = {
  firstArray,
  secondArray,
};

fs.writeFileSync('data.json', JSON.stringify(outputData, null, 2), 'utf8');
