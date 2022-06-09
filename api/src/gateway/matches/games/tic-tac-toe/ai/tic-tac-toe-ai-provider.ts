import { TicTacToeEasyAi } from '@app/gateway/matches/games/tic-tac-toe/ai/tic-tac-toe.easy-ai';
import { TicTacToeMediumAi } from '@app/gateway/matches/games/tic-tac-toe/ai/tic-tac-toe.medium-ai';
import { TicTacToeHardAi } from '@app/gateway/matches/games/tic-tac-toe/ai/tic-tac-toe.hard-ai';
import { TicTacToeAiInterface } from '@app/gateway/matches/games/tic-tac-toe/ai/tic-tac-toe-ai.interface';
import { DifficultyEnum } from '@app/shared/game-difficulty/difficulty.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicTacToeAiProvider {
  constructor(
    private readonly easy: TicTacToeEasyAi,
    private readonly medium: TicTacToeMediumAi,
    private readonly hard: TicTacToeHardAi,
  ) {
  }

  getProvider(difficulty: DifficultyEnum): TicTacToeAiInterface {
    switch (difficulty) {
      case DifficultyEnum.easy:
        return this.easy;
      case DifficultyEnum.medium:
        return this.medium;
      case DifficultyEnum.hard:
        return this.hard;
    }
  }
}
