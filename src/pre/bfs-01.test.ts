import { State, bfs } from './bfs-01';

class MockStateBase implements State {
  protected _value: number[];
  private _hash: string;

  constructor(value: number[]) {
    this._value = value;
    this._hash = JSON.stringify(value)
  }

  check(): boolean {
    return this._value[0] === 42;
  }

  next(): State[] {
    return [];
  }

  get hash(): string {
    return this._hash;
  }

  get value(): number[] {
    return this._value;
  }
}

describe.skip("BFS-01", () => {
  it("should find target", () => {
    class MockState extends MockStateBase {
      next(): MockState[] {
        return [
          new MockState([(this._value[0] + 1) % 100, 2, 3]),
          new MockState([(this._value[0] + 2) % 100, 2, 3]),
          new MockState([(this._value[0] + 3) % 100, 2, 3]),
        ]
      }
    }

    const state = new MockState([0, 2, 3]);
    const res = bfs(state) as MockState;
    expect(res.value).toStrictEqual([42, 2, 3]);
  });

  it("should not find target", () => {
    class MockState extends MockStateBase {
      next(): MockState[] {
        return [
          new MockState([(this._value[0] + 1) % 10, 2, 3]),
          new MockState([(this._value[0] + 2) % 10, 2, 3]),
          new MockState([(this._value[0] + 3) % 10, 2, 3]),
        ]
      }
    }

    const state = new MockState([0, 2, 3]);
    const res = bfs(state) as MockState;
    expect(res).toBe(undefined);
  });
});
