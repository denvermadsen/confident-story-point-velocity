import { mean } from "mathjs";

/**
 *
 * @param value monotonic function
 * @param expected expected output
 * @param low lower bound input
 * @param high upper bound input
 * @param tolerance maximum error
 * @returns
 */
export function binarySearch(
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
