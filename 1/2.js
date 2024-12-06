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
  lists[0]
    .map((num) => lists[1].filter((_num) => +num === +_num).length * +num)
    .reduce((a, c) => a + c, 0);

parseInput(FILE_PATH);

console.log(getSumDiff(lists));
