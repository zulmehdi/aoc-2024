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

const splitReport = (report, n) => {
  return [
    [...report.slice(0, n - 2), ...report.slice(n - 1, report.length)],
    [...report.slice(0, n), ...report.slice(n + 1, report.length)],
    [...report.slice(0, n - 1), ...report.slice(n, report.length)],
  ];
};

const checkReportSafety = (report, prevDiffType, n = 1, dampen = 0) => {
  if (n >= report.length || report.length < 2) {
    return 1;
  }

  if (dampen > 1) {
    console.log('----- unsafe');
    return 0;
  }

  const diff = report[n] - report[n - (dampen > 1 ? 2 : 1)];
  const diffType = diff < 0 ? 'negative' : 'positive';

  if (diffType !== prevDiffType || Math.abs(diff) < 1 || Math.abs(diff) > 3) {
    if (dampen >= 1) {
      return 0;
    } else {
      dampen++;
      const reportSplit = splitReport(report, n);

      if (reportSplit[0].length < 1 || reportSplit[1].length < 1) {
        return 1;
      }

      if (
        !checkReportSafety(
          reportSplit[0],
          reportSplit[0][1] - reportSplit[0][0] < 0 ? 'negative' : 'positive',
          1,
          dampen
        ) &&
        !checkReportSafety(
          reportSplit[1],
          reportSplit[1][1] - reportSplit[1][0] < 0 ? 'negative' : 'positive',
          1,
          dampen
        ) &&
        !checkReportSafety(
          reportSplit[2],
          reportSplit[2][1] - reportSplit[2][0] < 0 ? 'negative' : 'positive',
          1,
          dampen
        )
      ) {
        return 0;
      } else {
        return 1;
      }
    }
  }

  if (dampen > 1) return 0;
  else return checkReportSafety(report, prevDiffType, n + 1, dampen);
};

const getNumOfSafeReports = (reports) =>
  reports
    .map((report, index) => {
      const processedReport = checkReportSafety(
        report,
        report[1] - report[0] < 0 ? 'negative' : 'positive'
      );

      return processedReport;
    })
    .reduce((a, c) => a + c, 0);

parseInput(FILE_PATH);

console.log(getNumOfSafeReports(reports));
