import { bfs, path } from './bfs.js';

const res = bfs<number>({
  start: 0,
  adj: state => ([
    (state + 1) % 10**5,
    (state + 2) % 10**5,
    (state + 3) % 10**5,
  ]),
  check: state => state === 10**5 - 1
});

console.log(JSON.stringify(path(res)));
