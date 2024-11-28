import { describe, it, expect, vi } from "vitest";
import { Processor } from "./processor";

describe("Processor 클래스", () => {
  let processor: Processor;

  beforeEach(() => {
    processor = new Processor();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("processLargeData", () => {
    it("processLargeData는 배열의 합계를 반환한다", () => {
      const data = [1, 2, 3, 4, 5];
      const result = processor.processLargeData(data);
      expect(result).toBe(15);
    });

    it("processLargeData 실행 시간을 콘솔에 출력한다", () => {
      const consoleSpy = vi.spyOn(console, "log");
      processor.processLargeData([1, 2, 3]);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("processLargeData 실행시간"));
      consoleSpy.mockRestore();
    });
  });

  const runManyTimes = async (count: number, delay: number) => {
    for (let i = 0; i < count; i++) {
      vi.advanceTimersByTime(100);
      processor.runFrequently();
    }
  };

  describe("runFrequently", () => {
    it("runFrequently는 1초 동안 5회 이상 호출될 수 없다", async () => {
      await runManyTimes(5, 100);
      expect(() => processor.runFrequently()).toThrow(Error);
    });

    it("runFrequently는 제한 시간이 지나면 다시 호출 가능하다", async () => {
      vi.advanceTimersByTime(1500);
      await runManyTimes(5, 200);
      vi.advanceTimersByTime(1100);
      expect(() => processor.runFrequently()).not.toThrow();
    });
  });
});
