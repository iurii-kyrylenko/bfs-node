import { State, bfs } from './bfs.js';

class MockState implements State<number> {
  protected _value: number;

  constructor(value: number) {
    this._value = value
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

  get value(): number {
    return this._value;
  }
}

const state = new MockState(0);

const res = bfs(state);
console.log(res?.value);
