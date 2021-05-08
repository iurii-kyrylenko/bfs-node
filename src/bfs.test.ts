import { State, bfs } from './bfs';

class MockStateBase implements State<number> {
  protected _value: number;

  constructor(value: number) {
    this._value = value
  }

  check(): boolean {
    return this._value === 42;
  }

  next(): State<number>[] {
    return [];
  }

  get value(): number {
    return this._value;
  }
}

describe("BFS", () => {
  it("should find target", () => {
    class MockState extends MockStateBase {
      next(): MockState[] {
        return [
          new MockState((this._value + 1) % 100),
          new MockState((this._value + 2) % 100),
          new MockState((this._value + 3) % 100)
        ]
      }
    }    

    const state = new MockState(0);
    expect(bfs(state)?.value).toBe(42);
  });

  it("should not find target", () => {
    class MockState extends MockStateBase {
      next(): MockState[] {
        return [
          new MockState((this._value + 1) % 10),
          new MockState((this._value + 2) % 10),
          new MockState((this._value + 3) % 10)
        ]
      }
    }

    const state = new MockState(0);
    expect(bfs(state)?.value).toBe(undefined);
  });
});
