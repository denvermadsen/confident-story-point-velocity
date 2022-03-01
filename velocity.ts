import { std } from "mathjs";
import * as dist from "@stdlib/stats-base-dists-t";
import * as bisect from "bisect";

const data = [1, 4, 7, 2, 6];
const s = std(data, "uncorrected");
const degreesFreedom = data.length - 1;
const t = new dist.T(19);
const prob = t.cdf(1.7291);
const confLevel = 0.95;
const numStds = bisect((x: number) => t.cdf(x) >= confLevel, -10, 10, 1e-8);

console.log(`# STDs: ${numStds}`);
