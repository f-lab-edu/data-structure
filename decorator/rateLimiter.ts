export function RateLimiter(limit: number = 5, period: number = 1000) {
  const calls = new Map<string, number[]>();

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const now = Date.now();

      const recentCalls = calls.get(propertyKey)?.filter((time) => now - time <= period) || [];
      calls.set(propertyKey, recentCalls);

      if (recentCalls.length >= limit) {
        throw new Error(`${propertyKey} 이 ${period}ms동안 ${limit}번 넘게 실행되었어요`);
      }

      recentCalls.push(now);
      calls.set(propertyKey, recentCalls);

      return originalMethod.apply(this, args);
    };
  };
}
