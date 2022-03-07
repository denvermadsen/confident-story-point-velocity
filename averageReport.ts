import { mean, std } from "mathjs";

export function averageReport(data: number[]): string {
  const average = mean(data);
  const standardDeviation = std(data, "uncorrected");
  return `Average velocity over ${data.length} sprints: ${average.toFixed(
    1
  )} Story Points per Sprint (Standard Deviation: ${standardDeviation.toFixed(
    2
  )})`;
}
