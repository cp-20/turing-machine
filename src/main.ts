import { TuringMachine, type TMTransition } from './turing-machine';

const symbols = ['B', '0', '1'] satisfies string[];
const states = ['0', '1', '2', 'fin'] satisfies string[];

type ValueOf<T> = T[keyof T];

const transitions = [
  { from: '0', read: '0', to: '0', write: '0', move: 'R' },
  { from: '0', read: '1', to: '0', write: '1', move: 'R' },
  { from: '0', read: 'B', to: '1', write: 'B', move: 'L' },
  { from: '1', read: '0', to: '2', write: '1', move: 'L' },
  { from: '1', read: '1', to: '1', write: '0', move: 'L' },
  { from: '1', read: 'B', to: 'fin', write: '1', move: 'N' },
  { from: '2', read: '0', to: '2', write: '0', move: 'L' },
  { from: '2', read: '1', to: '2', write: '1', move: 'L' },
  { from: '2', read: 'B', to: 'fin', write: 'B', move: 'N' },
] as TMTransition<ValueOf<typeof symbols>, ValueOf<typeof states>>[];

const input = '100';
const inputTape = input.split('');

const turingMachine = new TuringMachine(
  symbols,
  states,
  transitions,
  inputTape,
  true
);
turingMachine.run();
