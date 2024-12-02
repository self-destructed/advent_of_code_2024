const fs = require('fs');
const path = require('path');

const inputFile = path.resolve(__dirname, 'data.txt');
const outputFile = path.resolve(__dirname, 'data.json');

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const result = data
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => line.split(/\s+/).map(Number));

  fs.writeFile(outputFile, JSON.stringify(result, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
    } else {
      console.log(`Data successfully written to ${outputFile}`);
    }
  });
});
