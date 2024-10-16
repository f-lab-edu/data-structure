import { LinkedList } from "../linkedList/linkedList";

class Stack<T> {
  private linkedList = new LinkedList<T>();

  push(value: T): void {
    this.linkedList.insertLast(value);
  }

  pop(): void {
    this.linkedList.deleteLast();
  }

  top(): T | null {
    return this.linkedList.search(this.length - 1);
  }

  get length(): number {
    return this.linkedList.length;
  }

  printAll(): string | null {
    return this.linkedList.printAll();
  }
}
