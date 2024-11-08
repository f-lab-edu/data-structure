class Node<T> {
  value: T;
  next: Node<T> | null = null;
  prev: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  length: number = 0;
  head: Node<T> | null = null;
  tail: Node<T> | null = null;

  insertLast(value: T): void {
    const newNode = new Node<T>(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
  }

  insertAt(index: number, value: T): void {
    const target = this.searchNode(index);
    if (!target) throw new Error("인덱스가 존재하지 않습니다");
    target.value = value;

    this.length++;
  }

  search(index: number): T | null {
    const target = this.searchNode(index);
    const value = target?.value;
    return value || null;
  }

  private searchNode(index: number): Node<T> | null {
    if (!this.length) return null;

    let current = this.head;
    let count = 0;
    while (count < index) {
      if (!current) return null;
      current = current.next;
      count++;
    }
    return current;
  }

  deleteAt(index: number): T | null {
    const target = this.searchNode(index);
    if (!target) return null;

    const value = target.value;

    if (target === this.head && this.length === 1) {
      this.head = null;
      this.tail = null;
    } else if (target === this.head) {
      this.head = target.next;
      if (this.head) this.head.prev = null;
    } else if (target === this.tail) {
      this.tail = target.prev as Node<T>;
      this.tail.next = null;
    } else {
      if (target.prev) target.prev.next = target.next;
      if (target.next) target.next.prev = target.prev;
    }

    this.length--;
    return value;
  }

  deleteLast(): T | null {
    if (this.length === 0) throw new Error("삭제할 노드가 존재하지 않습니다");
    return this.deleteAt(this.length - 1);
  }

  deleteFirst(): T | null {
    if (this.length === 0) throw new Error("삭제할 노드가 존재하지 않습니다");
    return this.deleteAt(0);
  }

  printAll(): string | null {
    if (!this.head) return null;
    let current = this.head;
    let temp = "[";
    while (current) {
      temp += current.value;
      if (current.next) temp += ", ";
      current = current.next!;
    }
    temp += "]";
    return temp;
  }
}
