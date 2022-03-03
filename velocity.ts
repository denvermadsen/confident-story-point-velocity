import { std, mean, sqrt, number } from "mathjs";
import { argv } from "process";
import gaussian from "gaussian";
/**
 *
 * @param value monotonic function
 * @param expected expected output
 * @param low lower bound input
 * @param high upper bound input
 * @param tolerance maximum error
 * @returns
 */
function binarySearch(
  value: (x: number) => number,
  expected: number,
  low: number,
  high: number,
  tolerance: number
) {
  while (high - low > tolerance * 2) {
    const guess = mean(low, high);
    if (value(guess) < expected) {
      low = guess;
    } else {
      high = guess;
    }
  }
  return mean(low, high);
}
const data = argv.slice(2, -1).map<number>((x) => number(x) as number);
const confidence = number(argv[argv.length - 1]) as number;
const maxError = 1e-8;
const average = mean(data);
const low = 0;
const high = average * 10;
const standardDeviation = std(data, "uncorrected");
const normalDistribution = gaussian(
  average,
  standardDeviation * standardDeviation
);

const value = binarySearch(
  (x) => normalDistribution.cdf(x),
  1 - confidence,
  low,
  high,
  maxError
);

console.log(
  `Average velocity over ${data.length} sprints: ${average.toFixed(
    1
  )} Story Points per Sprint (Standard Deviation: ${standardDeviation.toFixed(
    2
  )})`
);
console.log(
  `There is a ${confidence * 100}% chance that we can complete ${value.toFixed(
    0
  )} Story Points`
);
