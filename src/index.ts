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

if (!res) {
  console.log('Not found');
}
else {
  console.log('length:', res.length - 1);
  console.log('path:', ...res);
}
