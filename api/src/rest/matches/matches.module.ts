import { Module } from '@nestjs/common';
import { MatchesController } from '@app/rest/matches/matches.controller';
import { MatchesService } from '@app/rest/matches/matches.service';


@Module({
  controllers: [MatchesController],
  providers: [
    MatchesService,
  ],
})
export class MatchesModule {
}
