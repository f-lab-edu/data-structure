class NodeTS {
  right: NodeTS | null = null;
  left: NodeTS | null = null;
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

class BinarySearchTree {
  root: NodeTS | null = null;
  length: number = 0;

  private recursiveInsert(node: NodeTS, value: number): void {
    if (node?.value === value) throw new Error("이미 존재하는 값입니다");
    const newNode = new NodeTS(value);
    if (node?.value > value) {
      if (node?.left) {
        this.recursiveInsert(node?.left, value);
      } else {
        node.left = newNode;
      }
    } else {
      if (node?.right) {
        this.recursiveInsert(node?.right, value);
      } else {
        node.right = newNode;
      }
    }
  }

  insert(value: number): void {
    if (!this.root) {
      this.root = new NodeTS(value);
    } else {
      this.recursiveInsert(this.root, value);
    }

    this.length++;
  }

  private recursiveSearch(node: NodeTS, value: number): NodeTS | null {
    if (node.value === value) return node;
    if (node.value > value) {
      if (!node.left) return null;
      return this.recursiveSearch(node.left, value);
    } else {
      if (!node.right) return null;
      return this.recursiveSearch(node.right, value);
    }
  }

  search(value: number): NodeTS | null {
    if (!this.root) return null;
    if (this.root?.value === value) {
      return this.root;
    }
    return this.recursiveSearch(this.root, value);
  }

  private recursiveDelete(node: NodeTS | null, value: number): NodeTS | null {
    if (!node) throw new Error("해당 값이 존재하지 않습니다");
    if (node.value === value) {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let exchange = node.left;
      while (exchange.right) {
        exchange = exchange.right;
      }
      const temp = node.value;
      node.value = exchange.value;
      exchange.value = temp;
      this.recursiveDelete(node.left, temp);
      return node;
    } else {
      if (node.value > value) {
        node.left = this.recursiveDelete(node.left, value);
      } else if (node.value < value) {
        node.right = this.recursiveDelete(node.right, value);
      }
      return node;
    }
  }

  delete(value: number): void {
    if (!this.root) throw new Error("삭제할 값이 없습니다");
    this.root = this.recursiveDelete(this.root, value);
    if (this.root) this.length--;
  }
}
