interface BfsParams<T> {
  start: T,
  adj: (state: T) => T[];
  check: (state: T) => boolean;
  hash?: (state: T) => string;
}

export function bfs<T> (
  params: BfsParams<T>
): T | undefined {
  const {
    start,
    adj,
    check,
    hash = JSON.stringify
  } = params;
  
  const set: Set<string> = new Set();
  const queue: T[] = [];

  let state = start;

  for(;;) {
    if (check(state)) {
      return state;
    }

    const states = adj(state);

    states
      .filter(s => !set.has(hash(s)))
      .forEach(s => {
        queue.push(s);
        set.add(hash(s))
      });

    const next = queue.shift();

    if (!next) {
      return undefined;
    }

    state = next;
  }
}
