import gaussian, { Gaussian } from "gaussian";
import { mean, number, std } from "mathjs";
import { argv } from "process";
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
      const conf = confidenceOfCompletingLessThan(
        storyPoints,
        normalDistribution.scale(sprints)
      );
      console.log(conf, sprints, confidence);
      return conf;
    },
    confidence,
    low,
    high,
    maxError
  );
}
function confidenceOfCompletingLessThan(n: number, dist: Gaussian) {
  const conf = dist.cdf(n);
  return conf;
}

console.log(
  `There is a ${
    confidence * 100
  }% chance we can complete the task (${storyPointsToComplete} Story Points) in ${numberOfSprintsToComplete(
    storyPointsToComplete,
    confidence
  ).toFixed(2)} Sprints`
);
