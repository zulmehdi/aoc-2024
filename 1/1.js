const { getFileContents } = require('../lib/read-file');

const IS_TEST = false;
const FILE_PATH = `./data/data${IS_TEST ? '_sample' : ''}`;
const DELIMITER = '   ';

const lists = [[], []];

const parseInput = (filePath) =>
  getFileContents(filePath).forEach((line) => {
    const nums = line.split(DELIMITER);

    lists[0].push(nums[0]);
    lists[1].push(nums[1]);
  });

const getSumDiff = (lists) =>
  lists
    .map((list) => list.sort((a, b) => a - b))[0]
    .map((num, index) => Math.abs(num - lists[1][index]))
    .reduce((a, c) => a + c, 0);

parseInput(FILE_PATH);

console.log(getSumDiff(lists));
