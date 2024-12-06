const { getFileContents } = require('../lib/read-file');

const IS_TEST = false;
const FILE_PATH = `./data/data${IS_TEST ? '_sample' : ''}`;

let muls = [];

const parseInput = (filePath) => {
  muls = getFileContents(filePath)
    .join('')
    .match(/mul\((\d+),(\d+)\)/g);
};

const mul = (x, y) => x * y;

const getMulSum = (muls) =>
  muls.map((_mul) => eval(_mul)).reduce((a, c) => a + c, 0);

parseInput(FILE_PATH);
console.log(getMulSum(muls));
