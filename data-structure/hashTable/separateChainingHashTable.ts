class SeparateChainingHashTable<T> {
  table: { [key: number]: [string, T][] } = {};
  size: number;
  constructor(size: number) {
    this.size = size;
  }

  private throwError(
    type: "DUPLICATE_KEY" | "KEY_NOT_FOUND" = "KEY_NOT_FOUND"
  ): never {
    if (type === "DUPLICATE_KEY") {
      throw new Error("이미 등록된 키입니다.");
    } else {
      throw new Error("존재하지 않는 키입니다.");
    }
  }

  private hashFunc(key: number | string, size: number): number {
    let hash = 0;
    key = key.toString();
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
    }
    const hashedKey = Math.abs(hash) % size;
    return hashedKey;
  }

  insert(key: string, value: T): void {
    const hashedKey = this.hashFunc(key, this.size);
    if (!this.table[hashedKey]) {
      this.table[hashedKey] = [];
    }
    const bucket = this.table[hashedKey];
    for (const [storedKey] of bucket) {
      if (storedKey === key) this.throwError("DUPLICATE_KEY");
    }
    bucket.push([key, value]);
  }

  search(key: string): T | null {
    const hashedKey = this.hashFunc(key, this.size);
    const bucket = this.table[hashedKey];
    if (!bucket) return null;
    for (const [storedKey, storedValue] of bucket) {
      if (storedKey === key) {
        return storedValue;
      }
    }
    return null;
  }

  update(key: string, value: T): void {
    const hashedKey = this.hashFunc(key, this.size);
    const bucket = this.table[hashedKey];
    if (!bucket) this.throwError("KEY_NOT_FOUND");
    for (const entry of bucket) {
      if (entry[0] === key) {
        entry[1] = value;
        return;
      }
    }
    this.throwError("KEY_NOT_FOUND");
  }
  delete(key: string): void {
    const hashedKey = this.hashFunc(key, this.size);
    const bucket = this.table[hashedKey];
    if (!bucket) this.throwError("KEY_NOT_FOUND");
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
      }
      if (bucket.length === 0) {
        delete this.table[hashedKey];
      }
      return;
    }
    this.throwError("KEY_NOT_FOUND");
  }
}
