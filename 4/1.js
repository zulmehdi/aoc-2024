const { getFileContents } = require('../lib/read-file');

const IS_TEST = false;
const FILE_PATH = `./data/data${IS_TEST ? '_sample' : ''}`;
const SEARCH_STRING = 'XMAS'.split('');

let input = [];
let width = 0;
let height = 0;

const dirOps = {
  up: (x, y) => [x - 1, y],
  down: (x, y) => [x + 1, y],
  left: (x, y) => [x, y - 1],
  right: (x, y) => [x, y + 1],
  ul: (x, y) => [x - 1, y - 1],
  ur: (x, y) => [x - 1, y + 1],
  dl: (x, y) => [x + 1, y - 1],
  dr: (x, y) => [x + 1, y + 1],
};

const dirs = Object.keys(dirOps);

const parseInput = (filePath) => {
  input = getFileContents(filePath).map((line) => line.split(''));
  width = input[0].length;
  height = input.length;
};

const searchXmas = (input) => {
  let found = 0;

  for (let x = 0; x < input.length; x++) {
    const line = input[x];

    for (let y = 0; y < line.length; y++) {
      const char = line[y];

      for (let dirPos = 0; dirPos < dirs.length; dirPos++) {
        if (char === SEARCH_STRING[0]) {
          found += search(input, x, y, dirPos);
        }
      }
    }
  }

  return found;
};

const search = (input, x = 0, y = 0, dirPos = 0, position = 0) => {
  if (x < 0 || y < 0 || x > input.length - 1 || y > input.length - 1) return 0;

  const char = input[x][y];
  const match = char === SEARCH_STRING[position];
  const dir = dirs[dirPos];

  //   console.log(char, match);
  if (position >= SEARCH_STRING.length - 1 && match) return 1;

  if (!match) return 0;

  [x, y] = updateXY(dir, x, y);

  return search(input, x, y, dirPos, ++position);
};

const updateXY = (dir, x, y) => {
  return dirOps[dir](x, y);
};

parseInput(FILE_PATH);

console.log(searchXmas(input));
