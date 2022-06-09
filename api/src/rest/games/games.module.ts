import { Module } from '@nestjs/common';
import { GamesController } from '@app/rest/games/games.controller';
import { GamesService } from '@app/rest/games/games.service';


@Module({
  controllers: [GamesController],
  providers: [
    GamesService,
  ],
})
export class GamesModule {
}
