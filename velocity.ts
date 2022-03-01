import { std, mean, sqrt } from "mathjs";
import * as dist from "@stdlib/stats-base-dists-t";

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
    console.log(guess);
    if (value(guess) < expected) {
      low = guess;
    } else {
      high = guess;
    }
  }
  return mean(low, high);
}

const data = [1, 4, 7, 2, 6];
const confidence = 0.95;
const low = -10;
const high = 10;
const tolerance = 1e-8;
const s = std(data, "uncorrected");
const degreesFreedom = data.length;
const t = new dist.T(degreesFreedom);
const tValue = binarySearch((x) => t.cdf(x), confidence, low, high, tolerance);
const standardError = s / sqrt(data.length);
const total = tValue * standardError + mean(data);

console.log(`result: ${total}`);
