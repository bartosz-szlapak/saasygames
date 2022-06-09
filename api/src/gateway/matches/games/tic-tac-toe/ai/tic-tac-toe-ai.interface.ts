import { MatchStateInterface } from '@app/gateway/matches/games/match-state.interface';
import { TicTacToeBoard } from '@app/gateway/matches/games/tic-tac-toe/tic-tac-toe-board';
import { TicTacToePlayerMove } from '@app/gateway/matches/games/tic-tac-toe/tic-tac-toe-player-move';

export interface TicTacToeAiInterface {
  createMove(matchState: MatchStateInterface<TicTacToeBoard>): Promise<TicTacToePlayerMove>
}
