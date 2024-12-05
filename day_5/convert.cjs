const fs = require('fs/promises');
const path = require('path');

const inputFile1 = path.resolve(__dirname, 'data_1.txt');
const inputFile2 = path.resolve(__dirname, 'data_2.txt');
const outputFile = path.resolve(__dirname, 'data.json');

const convert = async () => {
  const result = {
    pages: [],
    updates: [],
  };

  try {
    const data1 = await fs.readFile(inputFile1, 'utf8');
    const lines1 = data1.trim().split('\n');
    result.pages = lines1.map((line) => {
      const [key, value] = line.split('|').map(Number);
      return [key, value];
    });

    const data2 = await fs.readFile(inputFile2, 'utf8');
    const lines2 = data2.trim().split('\n');
    const updates = lines2.map((line) =>
      line.split(',').map((x) => parseInt(x, 10)),
    );

    result.updates = updates;

    await fs.writeFile(outputFile, JSON.stringify(result, null, 2), 'utf8');
    console.log(`Data successfully written to ${outputFile}`);
  } catch (err) {
    console.error('Error:', err);
  }
};

convert();
