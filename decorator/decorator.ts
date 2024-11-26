function MeasureExecutionTime(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyName} 실행시간 ${(end - start).toFixed(3)} ms `);
    return result;
  };
}

class Processor {
  @MeasureExecutionTime
  processLargeData(data: number[]): number {
    return data.reduce((a, c) => a + c, 0);
  }
}

const processor = new Processor();
const largeData = Array(10000)
  .fill(0)
  .map((_, i) => i);
processor.processLargeData(largeData);
