import { GameInterface } from '@app/gateway/matches/games/game.interface';
import { GameEnum } from '@app/gateway/matches/games/game.enum';
import { TicTacToeGame } from '@app/gateway/matches/games/tic-tac-toe/tic-tac-toe.game';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameProvider {

  constructor(
    private readonly ticTacToeGame: TicTacToeGame,
  ) {
  }

  getProvider(gameId: GameEnum): GameInterface {
    switch (gameId) {
      case GameEnum.ticTacToe:
        return this.ticTacToeGame;
    }
  }
}
