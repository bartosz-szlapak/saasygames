import { TicTacToeAiInterface } from '@app/gateway/matches/games/tic-tac-toe/ai/tic-tac-toe-ai.interface';
import { MatchStateInterface } from '@app/gateway/matches/games/match-state.interface';
import { TicTacToeBoard } from '@app/gateway/matches/games/tic-tac-toe/tic-tac-toe-board';
import { TicTacToePlayerMove } from '@app/gateway/matches/games/tic-tac-toe/tic-tac-toe-player-move';

export class TicTacToeEasyAi implements TicTacToeAiInterface {
  async createMove(matchState: MatchStateInterface<TicTacToeBoard>): Promise<TicTacToePlayerMove> {
    const unoccupiedFields = matchState.board.filter(f => !f.isOccupied);
    const randomIndex = Math.floor(Math.random() * unoccupiedFields.length);

    return {
      fieldId: unoccupiedFields[randomIndex].id
    };
  }

}
