import { std, mean, sqrt, number } from "mathjs";
import * as dist from "@stdlib/stats-base-dists-t";
import { argv } from "process";

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
const data = argv.slice(2, -2).map<number>((x) => number(x) as number);
const confidence = number(argv[argv.length - 1]) as number;
const low = -10;
const high = 10;
const tolerance = 1e-8;
const degreesFreedom = data.length;
const t = new dist.T(degreesFreedom);
const tValue = binarySearch((x) => t.cdf(x), confidence, low, high, tolerance);
const standardError = std(data, "uncorrected") / sqrt(data.length);
const total = tValue * standardError + mean(data);

console.log(
  `There is a ${confidence * 100}% chance that we can complete ${total.toFixed(
    0
  )} Story Points`
);
