import { Controller, Get, UseInterceptors, UsePipes } from '@nestjs/common';
import { TransformResponseInterceptor } from '@app/shared/transform-response.interceptor';
import { StatsService } from '@app/rest/stats/stats.service';
import { Public } from '@app/shared/public-endpoint.decorator';
import { Validate } from '@app/shared/validation/validate.pipe';
import { PlatformStats } from '@app/rest/stats/models/platform-stats';
import { UserStats } from '@app/rest/stats/models/user-stats';
import { GetContext } from '@app/shared/context/context.decorator';
import { Context } from '@app/shared/context/context';

@Controller('stats')
@UseInterceptors(TransformResponseInterceptor)
@UsePipes(Validate())
export class StatsController {
  constructor(
    private readonly statsService: StatsService,
  ) {
  }

  @Get('platform')
  @Public()
  getPlatformStats(): Promise<PlatformStats> {
    return this.statsService.getPlatformStats();
  }

  @Get('user')
  getUserStats(
    @GetContext() context: Context,
  ): Promise<UserStats> {
    return this.statsService.getUserStats(context.userId);
  }
}
