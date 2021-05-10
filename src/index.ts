import { State, bfs } from './bfs-01.js';

class MockState implements State {
  private _value: number;
  private _hash: string;

  constructor(value: number) {
    this._value = value;
    this._hash = value.toString();
  }

  check(): boolean {
    return this._value === 42;
  }

  next(): MockState[] {
    return [
      new MockState((this._value + 1) % 100),
      new MockState((this._value + 2) % 100),
      new MockState((this._value + 3) % 100)
    ]
  }

  get hash(): string {
    return this._hash
  }

  get value(): number {
    return this._value;
  }
}

const state = new MockState(0);
const res = bfs(state);
console.log(res);
