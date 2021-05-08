interface State<T> {
  check: () => boolean;
  next: () => State<T>[];
  readonly value: T;
}

class MockState implements State<number> {
  private _value: number;

  constructor(value: number) {
    this._value = value
  };

  check() {
    return this._value === 42;
  };

  next() {
    return [
      new MockState((this._value + 1) % 100),
      new MockState((this._value + 2) % 100),
      new MockState((this._value + 3) % 100)
    ]
  };

  get value() {
    return this._value;
  }
}

export { State, MockState }
