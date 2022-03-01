import { std } from "mathjs";
import * as dist from "@stdlib/stats-base-dists-t";

const data = [1, 4, 7, 2, 6];
const s = std(data, "uncorrected");
const degreesFreedom = data.length - 1;
const t = new dist.T(19);
const prob = t.cdf(1.7291);

console.log(`PRob: ${prob}`);
