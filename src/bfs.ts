interface BfsParams<T> {
  start: T,
  adj: (state: T) => T[];
  check: (state: T) => boolean;
  hash?: (state: T) => string;
}

type BfsResult<T> = T[] | undefined

interface Node<T> {
  state: T;
  track: T[]
}

function agg<T>(node: Node<T>): T[] {
  return [...node.track, node.state]
}

export function bfs<T> (params: BfsParams<T>): BfsResult<T> {
  const {
    start,
    adj,
    check,
    hash = JSON.stringify
  } = params;
  
  const set: Set<string> = new Set();
  const queue: Node<T>[] = [];

  let node: Node<T> = {
    state: start,
    track: []
  }

  for(;;) {
    if (check(node.state)) {
      return agg(node);
    }

    const states = adj(node.state);

    states
      .filter(s => !set.has(hash(s)))
      .forEach(s => {
        queue.push({ state: s, track: agg(node) });
        set.add(hash(s))
      });

    const next = queue.shift();

    if (!next) {
      return undefined;
    }

    node = next;
  }
}
