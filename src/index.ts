import { bfs } from './bfs.js';

const res = bfs<number>({
  start: 0,
  adj: state => ([
    (state + 1) % 100,
    (state + 2) % 100,
    (state + 3) % 100,
  ]),
  check: state => state === 42
});

console.log(res);
