import { Module } from '@nestjs/common';
import { StatsController } from '@app/rest/stats/stats.controller';
import { StatsService } from '@app/rest/stats/stats.service';


@Module({
  controllers: [StatsController],
  providers: [
    StatsService,
  ],
})
export class StatsModule {
}
