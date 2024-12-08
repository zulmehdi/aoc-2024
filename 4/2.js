const { getFileContents } = require('../lib/read-file');

const IS_TEST = false;
const FILE_PATH = `./data/data${IS_TEST ? '_sample' : ''}`;
const SEARCH_STRING = 'MAS'.split('');

let input = [];
let width = 0;
let height = 0;

const dirOps = {
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

      if (char === SEARCH_STRING[1]) {
        found += search(input, x, y);
      }
    }
  }

  return found;
};

const search = (input, x = 0, y = 0) => {
  const chars = [];
  for (let dirPos = 0; dirPos < dirs.length; dirPos++) {
    const dir = dirs[dirPos];
    const [_x, _y] = updateXY(dir, x, y);

    if (_x < 0 || _y < 0 || _x > input.length - 1 || _y > input.length - 1)
      return 0;

    const char = input[_x][_y];

    if (char === SEARCH_STRING[0] || char === SEARCH_STRING[2])
      chars.push(char);
  }

  return (
    chars.length === dirs.length &&
    ((chars[0] === chars[1] && chars[2] === chars[3]) ||
      (chars[0] === chars[2] && chars[1] === chars[3])) &&
    chars.join('') !== 'MMMM' &&
    chars.join('') !== 'SSSS'
  );
};

const updateXY = (dir, x, y) => {
  return dirOps[dir](x, y);
};

parseInput(FILE_PATH);

console.log(searchXmas(input));
