class OpenAddressingHashTable<T> {
  size: number;
  table: (T | null)[];
  keys: (string | null)[];
  count: number = 0;
  constructor(size: number) {
    this.size = size;
    this.table = Array(size).fill(null);
    this.keys = Array(size).fill(null);
  }

  private hashFunc(key: string, attempt: number = 0): number {
    const hash = key.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const hashedKey = (hash + attempt) % this.size;
    return hashedKey;
  }

  private resize() {
    const prevKeys = this.keys;
    const prevTable = this.table;
    this.size *= 2;
    this.table = Array(this.size).fill(null);
    this.keys = Array(this.size).fill(null);
    this.count = 0;
    for (let i = 0; i < prevKeys.length; i++) {
      if (prevKeys[i] !== null) {
        this.insert(prevKeys[i] as string, prevTable[i] as T);
      }
    }
  }

  insert(key: string, value: T): void {
    for (let i = 0; i < this.size; i++) {
      const hashedKey = this.hashFunc(key, i);
      if (this.table[hashedKey] === null) {
        this.table[hashedKey] = value;
        this.keys[hashedKey] = key;
        this.count++;
        if (this.count >= this.size / 2) {
          this.resize();
        }
        return;
      }
      if (this.keys[hashedKey] === key) {
        throw new Error("이미 등록된 키입니다");
      }
    }
    throw new Error("테이블이 가득 찼습니다");
  }

  search(key: string): T | null {
    for (let i = 0; i < this.size; i++) {
      const hashedKey = this.hashFunc(key, i);
      if (this.keys[hashedKey] === key) {
        return this.table[hashedKey];
      }
      if (this.keys[hashedKey] === null) {
        return null;
      }
    }
    return null;
  }

  update(key: string, value: T) {
    for (let i = 0; i <= this.size; i++) {
      const hashedKey = this.hashFunc(key, i);
      if (this.keys[hashedKey] === null) {
        throw new Error("등록되지 않은 키입니다");
      }
      this.table[hashedKey] = value;
      this.keys[hashedKey] = key;
      return;
    }
  }

  delete(key: string) {
    for (let i = 0; i < this.size; i++) {
      const hashedKey = this.hashFunc(key, i);
      if (this.keys[hashedKey] === null) {
        throw new Error("등록되지 않은 키입니다");
      }
      this.table[hashedKey] = null;
      this.keys[hashedKey] = null;
      this.count--;
    }
  }
}
