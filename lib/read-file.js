const fs = require('fs');

module.exports.getFileContents = (filePath) =>
  fs.readFileSync(filePath, { encoding: 'utf8' }).split('\r\n');
