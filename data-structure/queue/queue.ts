import { LinkedList } from "../linkedList/linkedList";

class Queue<T> {
  private linkedList = new LinkedList<T>();

  enqueue(value: T): void {
    this.linkedList.insertLast(value);
  }

  dequeue(): void {
    this.linkedList.deleteFirst();
  }

  peek(): T | null {
    return this.linkedList.search(0);
  }

  get length(): number {
    return this.linkedList.length;
  }

  printAll(): string | null {
    return this.linkedList.printAll();
  }
}

const queue = new Queue<string>();
queue.enqueue("dd");
queue.enqueue("안녕");
queue.enqueue("하세요");

console.log(queue.printAll());
