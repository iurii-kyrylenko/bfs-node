interface BfsParams<T> {
  start: T,
  adj: (state: T) => T[];
  check: (state: T) => boolean;
  hash?: (state: T) => string;
}

interface Node<T> {
  state: T;
  parent?: Node<T>;
}

type BfsResult<T> = Node<T> | undefined

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
    state: start
  }

  for(;;) {
    if (check(node.state)) {
      return node;
    }

    const states = adj(node.state);

    states
      .filter(s => !set.has(hash(s)))
      .forEach(s => {
        queue.push({ state: s, parent: node });
        set.add(hash(s))
      });

    const next = queue.shift();

    if (!next) {
      return undefined;
    }

    node = next;
  }
}

export function path<T>(searchResult: BfsResult<T>): T[] {
  const res: T[] = [];

  if (!searchResult) {
    return res;
  }

  let node = searchResult;

  for (; node.parent; node = node.parent) {
    res.unshift(node.state);
  }

  res.unshift(node.state)

  return res;
}
