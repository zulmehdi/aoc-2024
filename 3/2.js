const { getFileContents } = require('../lib/read-file');

const IS_TEST = false;
const FILE_PATH = `./data/data${IS_TEST ? '_sample' : ''}`;

let muls = [];

const parseInput = (filePath) => {
  const stringContent = getFileContents(filePath).join('');
  const contentSplit = stringContent.split("don't()");
  const firstSet = contentSplit[0];
  const restSet = contentSplit.slice(1).join("don't()");
  const dos = restSet.match(/(do\(\))(.*?)(don't\(\)|$)/g).join('');
  muls = firstSet.match(/mul\((\d+),(\d+)\)/g);
  muls = [...muls, ...dos.match(/mul\((\d+),(\d+)\)/g)];
};

const mul = (x, y) => x * y;

const getMulSum = (muls) =>
  muls.map((_mul) => eval(_mul)).reduce((a, c) => a + c, 0);

parseInput(FILE_PATH);
console.log(getMulSum(muls));
