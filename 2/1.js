const { getFileContents } = require('../lib/read-file');

const IS_TEST = false;
const FILE_PATH = `./data/data${IS_TEST ? '_sample' : ''}`;
const DELIMITER = ' ';

const reports = [];

const parseInput = (filePath) =>
  getFileContents(filePath).forEach((line) => {
    const nums = line.split(DELIMITER);

    reports.push(nums);
  });

const checkReportSafety = (report, prevDiffType, n = 1) => {
  if (n === report.length) return 1;

  const diff = report[n] - report[n - 1];
  const diffType = diff < 0 ? 'negative' : 'positive';

  if (diffType !== prevDiffType || Math.abs(diff) < 1 || Math.abs(diff) > 3)
    return 0;

  return checkReportSafety(report, diffType, n + 1);
};

const getNumOfSafeReports = (reports) =>
  reports
    .map((report) =>
      checkReportSafety(
        report,
        report[1] - report[0] < 0 ? 'negative' : 'positive'
      )
    )
    .reduce((a, c) => a + c, 0);

parseInput(FILE_PATH);

console.log(getNumOfSafeReports(reports));
