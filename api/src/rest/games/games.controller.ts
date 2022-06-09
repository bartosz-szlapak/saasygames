import { Controller, Get, Param, Query, UseInterceptors, UsePipes } from '@nestjs/common';
import { TransformResponseInterceptor } from '@app/shared/transform-response.interceptor';
import { GamesService } from '@app/rest/games/games.service';
import { GetGamesParams } from '@app/rest/games/models/get-games.params';
import { GameIdParam } from '@app/rest/games/models/game-id-param';
import { PageableResponse } from '@app/shared/pageable-response/pageable-response';
import { Game } from '@app/entity/game.entity';
import { Public } from '@app/shared/public-endpoint.decorator';
import { Validate } from '@app/shared/validation/validate.pipe';

@Controller('games')
@UseInterceptors(TransformResponseInterceptor)
@UsePipes(Validate())
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
  ) {
  }

  @Get()
  @Public()
  async getGames(
    @Query() params: GetGamesParams,
  ): Promise<PageableResponse<Game>> {
    return this.gamesService.getGames(params);
  }

  @Get(':gameId')
  async getGame(
    @Param() gameIdParam: GameIdParam,
  ): Promise<Game> {
    return this.gamesService.getGame(gameIdParam.gameId);
  }
}
