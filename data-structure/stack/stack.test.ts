import { Stack } from "./stack";

describe("스택 구현", () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  describe("getter length와 push 메서드", () => {
    test("length는 스택의 길이를 반환하며 push 메서드는 스택의 값의 개수를 증가시킨다", () => {
      expect(stack.length).toBe(0);
      stack.push(10);
      expect(stack.length).toBe(1);
      stack.push(-15);
      expect(stack.length).toBe(2);
      stack.push(20);
      expect(stack.length).toBe(3);
    });
    test("가장 최근에 push 메서드로 삽입한 값은 최상단 값이 된다", () => {
      stack.push(20);
      expect(stack.top()).toBe(20);
      stack.push(123);
      expect(stack.top()).toBe(123);
    });
  });

  describe("top 메서드", () => {
    test("top 메서드는 스택이 비어있는 경우 null을 반환한다", () => {
      expect(stack.top()).toBeNull();
    });
  });

  describe("pop 메서드", () => {
    test("pop 메서드는 스택이 비어있는 경우 에러를 발생시킨다", () => {
      expect(() => stack.pop()).toThrow("삭제할 노드가 존재하지 않습니다");
    });

    test("pop 메서드는 length를 감소시킨다", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      stack.push(4);
      expect(stack.length).toBe(4);
      stack.pop();
      expect(stack.length).toBe(3);
      stack.pop();
      expect(stack.length).toBe(2);
      stack.pop();
      expect(stack.length).toBe(1);
    });

    test("pop 메서드는 제거한 값을 반환한다", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(2);
      stack.push(11);
      expect(stack.pop()).toBe(11);
    });

    test("pop 메서드는 스택에 값이 있을경우 최상단의 값을 제거한다", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.top()).toBe(3);
      stack.pop();
      expect(stack.top()).toBe(2);
      stack.pop();
      expect(stack.top()).toBe(1);
      stack.pop();
      expect(stack.top()).toBe(null);
    });
  });

  describe("printAll 메서드", () => {
    test("printAll 메서드는 스택의 모든 값을 최하위부터 순서대로 나열한다", () => {
      stack.push(1);
      stack.push(2);
      expect(stack.printAll()).toBe("[1, 2]");
      stack.push(3);
      stack.push(4);
      expect(stack.printAll()).toBe("[1, 2, 3, 4]");
      stack.pop();
      expect(stack.printAll()).toBe("[1, 2, 3]");
      stack.pop();
      stack.pop();
      expect(stack.printAll()).toBe("[1]");
      stack.pop();
      expect(stack.printAll()).toBe(null);
    });

    test("printAll 메서드는 스택에 값이 없을경우 null을 반환한다", () => {
      expect(stack.printAll()).toBe(null);
    });
  });
});
