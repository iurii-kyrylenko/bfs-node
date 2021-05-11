export interface State {
  check: () => boolean;
  next: () => State[];
  readonly hash: string;
}

export type BfsResult = State | undefined;

export function bfs(state: State): BfsResult {
  const queue: State[] = [];
  const set: Set<string> = new Set();

  for (;;) {
    if (state.check()) {
      return state;
    }

    const states: State[] = state.next();

    const res: BfsResult = pushAndShift(states, queue, set);

    if (!res) {
      return undefined;
    }

    state = res;
  }
}

function pushAndShift(
  states: State[],
  queue: State[],
  set: Set<string>
): BfsResult {
  states
    .filter(s => !set.has(s.hash))
    .forEach(s => {
      queue.push(s);
      set.add(s.hash)
    });

  return queue.shift();
}
