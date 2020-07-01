export const EMPTY = 'EMPTY';
export const HUMAN = 'HUMAN';
export const COMPUTER = 'COMPUTER';

export const initialState = {
  player: HUMAN,
  positions: [
    EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY
  ]
}