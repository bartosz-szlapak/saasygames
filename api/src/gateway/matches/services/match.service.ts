import { Injectable } from '@nestjs/common';
import { MatchCache } from '@app/gateway/matches/cache/match-cache';
import { EntityManager } from 'typeorm';
import { Match } from '@app/entity/match.entity';
import { GameProvider } from '@app/gateway/matches/games/game-provider';
import { MatchStatusEnum } from '@app/shared/match-status/match-status.enum';
import { MakeMovePayload } from '@app/gateway/matches/models/messages/make-move.payload';
import { MatchStateInterface } from '@app/gateway/matches/games/match-state.interface';
import { TokenService } from '@app/shared/security/token/token.service';
import { JoinGamePayload } from '@app/gateway/matches/models/messages/join-game.payload';
import { Logger } from '@app/shared/logger/logger';
import { LogLevelEnum } from '@app/shared/logger/log-level.enum';

@Injectable()
export class MatchService {

  constructor(
    private readonly matchCache: MatchCache,
    private readonly entityManager: EntityManager,
    private readonly gameProvider: GameProvider,
    private readonly tokenService: TokenService,
    private readonly logger: Logger,
  ) {
  }

  getMatchState(matchId: string): Promise<MatchStateInterface<any>> {
    return this.matchCache.getMatchState(matchId);
  }

  async joinMatch(payload: JoinGamePayload): Promise<MatchStateInterface<any>> {
    const matchState = await this.getMatchState(payload.matchId);
    const isJwtValid = await this.tokenService.validateToken(payload.jwt);
    if (!isJwtValid) {
      return matchState;
    }

    const match = await this.getMatch(payload.matchId);
    const decodedToken = this.tokenService.decodeToken(payload.jwt);
    const matchParticipant = match.players.find(p => p.userId === decodedToken.userId);
    if (!matchParticipant || matchState) {
      return matchState;
    }

    if (match.matchStatusId !== MatchStatusEnum.inProgress) {
      return matchState;
    }

    const newMatchState = this.gameProvider.getProvider(match.gameId).startGame(match.players);
    await this.matchCache.setMatchState(payload.matchId, newMatchState);

    return newMatchState;
  }

  async makeMove(move: MakeMovePayload): Promise<MatchStateInterface<any>> {
    this.logger.log({
      data: move,
      category: 'match-move',
      level: LogLevelEnum.info
    });
    const match = await this.getMatch(move.matchId);
    const state = await this.getMatchState(move.matchId);
    const newState = await this.gameProvider.getProvider(match.gameId).makeMove(match, state, move.playerId, move.playerMove);

    await this.matchCache.setMatchState(move.matchId, newState);

    return newState;
  }

  async isAiTurn(matchId: string): Promise<boolean> {
    const match = await this.getMatch(matchId);
    const state = await this.getMatchState(matchId);

    return match.players.find(p => p.id === state.currentTurnPlayerId).isAi;
  }

  async makeAiMove(state: MatchStateInterface<any>, matchId: string): Promise<MatchStateInterface<any>> {
    const match = await this.getMatch(matchId);
    const newState = await this.gameProvider.getProvider(match.gameId).makeAiMove(match, state);
    await this.matchCache.setMatchState(matchId, newState);

    return newState;
  }

  private getMatch(matchId: string): Promise<Match> {
    return this.entityManager.createQueryBuilder()
      .select('m')
      .from(Match, 'm')
      .innerJoinAndSelect('m.players', 'mp')
      .innerJoinAndSelect('m.game', 'g')
      .where('m.id = :matchId', {matchId})
      .getOneOrFail()
  }

}
