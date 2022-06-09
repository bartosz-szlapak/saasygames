import { CacheModule, Module } from '@nestjs/common';
import { MatchesGateway } from '@app/gateway/matches/matches.gateway';
import { MatchCache } from '@app/gateway/matches/cache/match-cache';
import { MatchService } from '@app/gateway/matches/services/match.service';
import { TicTacToeGame } from '@app/gateway/matches/games/tic-tac-toe/tic-tac-toe.game';
import { GameProvider } from '@app/gateway/matches/games/game-provider';
import { TicTacToeAiProvider } from '@app/gateway/matches/games/tic-tac-toe/ai/tic-tac-toe-ai-provider';
import { TicTacToeHardAi } from '@app/gateway/matches/games/tic-tac-toe/ai/tic-tac-toe.hard-ai';
import { TicTacToeMediumAi } from '@app/gateway/matches/games/tic-tac-toe/ai/tic-tac-toe.medium-ai';
import { TicTacToeEasyAi } from '@app/gateway/matches/games/tic-tac-toe/ai/tic-tac-toe.easy-ai';

@Module({
  providers: [
    MatchesGateway,
    MatchCache,
    MatchService,
    TicTacToeGame,
    GameProvider,
    TicTacToeAiProvider,
    TicTacToeHardAi,
    TicTacToeMediumAi,
    TicTacToeEasyAi
  ],
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 0,
    })
  ]
})
export class MatchesGatewayModule {
}
