import { bfs } from './bfs-03';

describe.skip("BFS-03: primitive state", () => {
  it("should find a target", () => {
    const res = bfs<number>({
      start: 0,
      adj: state => ([
        (state + 1) % 100,
        (state + 2) % 100,
        (state + 3) % 100,
      ]),
      check: state => state === 42
    });

    expect(res).toStrictEqual([0,3,6,9,12,15,18,21,24,27,30,33,36,39,42]);
  });

  it("should not find a target", () => {
    const res = bfs<number>({
      start: 0,
      adj: state => ([
        (state + 1) % 10,
        (state + 2) % 10,
        (state + 3) % 10,
      ]),
      check: state => state === 42
    });

    expect(res).toBeUndefined();
  });
});

describe.skip("BFS-03: complex state", () => {
  it("should find a target #1", () => {
    const res = bfs<number[]>({
      start: [1],
      adj: state => [
        state.map(x => x*2),
        state.map(x => x*4)
      ],
      check: state => state[0] === 16
    });

    expect(res).toStrictEqual([[1],[4],[16]]);
  });

  it("should find a target #2", () => {
    const res = bfs<number[]>({
      start: [1],
      adj: state => [
        state.map(x => x*2),
        state.map(x => x*4)
      ],
      check: state => state[0] === 32
    });

    expect(res).toStrictEqual([[1],[2],[8],[32]]);
  });
});
