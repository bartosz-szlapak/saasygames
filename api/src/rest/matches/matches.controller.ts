import { Body, Controller, Get, Param, Post, Query, UseInterceptors, UsePipes } from '@nestjs/common';
import { TransformResponseInterceptor } from '@app/shared/transform-response.interceptor';
import { MatchesService } from '@app/rest/matches/matches.service';
import { GetMatchesParams } from '@app/rest/matches/models/get-matches.params';
import { MatchIdParam } from '@app/rest/matches/models/match-id-param';
import { PageableResponse } from '@app/shared/pageable-response/pageable-response';
import { Match } from '@app/entity/match.entity';
import { Public } from '@app/shared/public-endpoint.decorator';
import { Validate } from '@app/shared/validation/validate.pipe';
import { CreateMatchPayload } from '@app/rest/matches/models/create-match.payload';
import { GetContext } from '@app/shared/context/context.decorator';
import { Context } from '@app/shared/context/context';
import { MatchPlayer } from '@app/entity/match-player.entity';

@Controller('matches')
@UseInterceptors(TransformResponseInterceptor)
@UsePipes(Validate())
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
  ) {
  }

  @Get()
  @Public()
  async getMatches(
    @Query() params: GetMatchesParams,
  ): Promise<PageableResponse<Match>> {
    return this.matchesService.getMatches(params);
  }

  @Public()
  @Get(':matchId')
  async getMatch(
    @Param() matchIdParam: MatchIdParam,
  ): Promise<Match> {
    return this.matchesService.getMatch(matchIdParam.matchId);
  }

  @Post()
  async createMatch(
    @GetContext() context: Context,
    @Body() payload: CreateMatchPayload
  ): Promise<Match> {
    return this.matchesService.createMatch(payload, context);
  }

  @Post(':matchId/join')
  async joinMatch(
    @GetContext() context: Context,
    @Param() matchIdParam: MatchIdParam,
  ): Promise<MatchPlayer> {
    return this.matchesService.joinMatch(matchIdParam.matchId, context);
  }
}
