import gaussian, { Gaussian } from "gaussian";
import { ceil, mean, number, sqrt, std } from "mathjs";
import { argv } from "process";
import { averageReport } from "./averageReport";
import { binarySearch } from "./binarySearch";

const data = argv.slice(2, -2).map<number>((x) => number(x) as number);
const confidence = number(argv[argv.length - 2]) as number;
const storyPointsToComplete = number(argv[argv.length - 1]) as number;
const maxError = 1e-8;
const average = mean(data);
const low = 0.1;
const high = average * 10000;
const standardDeviation = std(data, "uncorrected");
let normalDistribution = gaussian(
  average,
  standardDeviation * standardDeviation
);
function numberOfSprintsToComplete(storyPoints: number, confidence: number) {
  return binarySearch(
    (sprints) => {
      const sd = standardDeviation / sqrt(sprints);
      let dist = gaussian(average, sd * sd);
      return expectedStoryPoints(dist, confidence) * sprints;
    },
    storyPoints,
    low,
    high,
    maxError
  );
}

/**
 * low bound, number of story points we expect to compete at a confidence
 * @param dist
 * @param confidence
 * @returns
 */
function expectedStoryPoints(dist: Gaussian, confidence: number) {
  return binarySearch(
    (storyPoints) => dist.cdf(storyPoints),
    1 - confidence,
    low,
    high,
    maxError
  );
}
console.log(averageReport(data));
console.log(
  `There is a ${
    confidence * 100
  }% chance we can complete the workload (${storyPointsToComplete} Story Points) in ${ceil(
    numberOfSprintsToComplete(storyPointsToComplete, confidence)
  )} Sprints`
);
