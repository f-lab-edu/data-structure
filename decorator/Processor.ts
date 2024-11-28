import { MeasureExecutionTime } from "./MeasureExecutionTime";
import { RateLimiter } from "./rateLimiter";

export class Processor {
  @MeasureExecutionTime
  processLargeData(data: number[]): number {
    return data.reduce((a, c) => a + c, 0);
  }

  @RateLimiter(5, 1000)
  runFrequently(): void {
    console.log("run!");
  }
}
