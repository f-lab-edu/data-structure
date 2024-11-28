export function MeasureExecutionTime(
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
