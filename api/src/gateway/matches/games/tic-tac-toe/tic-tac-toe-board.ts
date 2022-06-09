export interface TicTacToeBoardField {
  id: number;
  playerId: string;
  isOccupied: boolean;
  isMarkedAsWin: boolean;
}

export type TicTacToeBoard = TicTacToeBoardField[];
