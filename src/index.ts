import { MockState } from './state.js';
import { bfs } from './bfs.js';

const state = new MockState(0);

const res = bfs(state);
console.log(res?.value);
