export interface State<T> {
  check: () => boolean;
  next: () => State<T>[];
  readonly value: T;
}

export type BfsResult<T> = State<T> | undefined;

export function bfs<T>(state: State<T>): BfsResult<T> {
  const queue: State<T>[] = [];
  const set: Set<T> = new Set();

  for (;;) {
    if (state.check()) {
      return state;
    }

    const states: State<T>[] = state.next();

    const res: BfsResult<T> = pushAndShift(states, queue, set);

    if (!res) {
      return undefined;
    }

    state = res;
  }
}

function pushAndShift<T>(
  states: State<T>[],
  queue: State<T>[],
  set: Set<T>
): BfsResult<T> {
  states
    .filter(s => !set.has(s.value))
    .forEach(s => {
      queue.push(s);
      set.add(s.value)
    });

  return queue.shift();
}
