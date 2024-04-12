import { DoublyLinkedList } from 'data-structure-typed';

export type TMTransition<TMSymbol, TMState> = {
  from: TMState;
  read: TMSymbol;
  to: TMState;
  write: TMSymbol;
  move: 'L' | 'R' | 'N';
};

export class TuringMachine<TMSymbol, TMState> {
  private symbols: TMSymbol[];
  private states: TMState[];
  private transitions: TMTransition<TMSymbol, TMState>[];
  private tape: DoublyLinkedList<TMSymbol>;
  private state: TMState;
  private head: number;
  private debug: boolean;

  constructor(
    symbols: TMSymbol[],
    states: TMState[],
    transitions: TMTransition<TMSymbol, TMState>[],
    input: TMSymbol[],
    debug: boolean = false
  ) {
    this.symbols = symbols;
    this.states = states;
    this.transitions = transitions;
    this.tape = new DoublyLinkedList(input);
    this.state = states[0];
    this.head = 0;
    this.debug = debug;
  }

  public run(): void {
    console.log(`input: ${[...this.tape.values()].join(' ')}`);

    while (this.state !== 'fin') {
      const currentSymbol = this.tape.at(this.head);
      const transition = this.transitions.find(
        (t) => t.from === this.state && t.read === currentSymbol
      );

      if (!transition) {
        console.log(
          `no transition found for state=${this.state} read=${currentSymbol}`
        );
        break;
      }

      this.state = transition.to;
      this.tape.deleteAt(this.head);
      this.tape.addAt(this.head, transition.write);

      if (transition.move === 'L') {
        if (this.head === 0) {
          this.tape.unshift(this.symbols[0]);
        } else {
          this.head--;
        }
      } else if (transition.move === 'R') {
        if (this.head === this.tape.size - 1) {
          this.tape.push(this.symbols[0]);
        }
        this.head++;
      }

      if (this.debug) {
        console.log(`new state: ${this.state}`);
        console.log(`tape: ${[...this.tape.values()].join(' ')}`);
      }
    }
  }
}
