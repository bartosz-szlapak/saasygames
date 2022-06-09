import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Match } from '@app/entity/match.entity';
import { GetMatchesParams } from '@app/rest/matches/models/get-matches.params';
import { PageableResponse } from '@app/shared/pageable-response/pageable-response';
import { CreateMatchPayload } from '@app/rest/matches/models/create-match.payload';
import { Context } from '@app/shared/context/context';
import { MatchStatus } from '@app/entity/match-status.entity';
import { MatchStatusEnum } from '@app/shared/match-status/match-status.enum';
import { ValidationError } from '@app/shared/exception/exceptions/validation.error';
import { Game } from '@app/entity/game.entity';
import { MatchPlayer } from '@app/entity/match-player.entity';
import { User } from '@app/entity/user.entity';
import { Difficulty } from '@app/entity/difficulty.entity';
import { ErrorStatusEnum } from '@app/shared/error/error-status.enum';

@Injectable()
export class MatchesService {

  constructor(
    private readonly entityManager: EntityManager,
  ) {
  }

  async getMatches(params: GetMatchesParams): Promise<PageableResponse<Match>> {
    const query = this.entityManager.createQueryBuilder()
      .select('m')
      .from(Match, 'm')
      .innerJoinAndSelect('m.game', 'g')
      .innerJoinAndSelect('m.players', 'mp')
      .limit(params.limit)
      .offset(params.offset);

    if (params.matchStatusId) {
      query.innerJoin('m.matchStatus', 'ms')
        .andWhere('ms.id in (:matchStatusId)', {matchStatusId: params.matchStatusId});
    }

    if (params.userName) {
      query.andWhere('mp.playerName like :userName', {userName: `%${ params.userName }%`});
    }

    const [items, count] = await query.getManyAndCount();

    return new PageableResponse<Match>(count, items, params.limit, params.offset);
  }

  getMatch(matchId: string): Promise<Match> {
    return this.entityManager.createQueryBuilder()
      .select('m')
      .from(Match, 'm')
      .innerJoinAndSelect('m.players', 'mp')
      .where('m.id = :matchId', {matchId})
      .getOneOrFail()
  }

  getUserOnGoingMatch(userId: number): Promise<MatchPlayer> {
    return this.entityManager.createQueryBuilder()
      .select('mp')
      .from(MatchPlayer, 'mp')
      .innerJoin('mp.user', 'mpu')
      .innerJoin('mp.match', 'm')
      .innerJoin('m.matchStatus', 'ms')
      .where('mpu.id = :userId', {userId})
      .andWhere('ms.id in(:matchStatusId)', {matchStatusId: [MatchStatusEnum.inProgress, MatchStatusEnum.pending]})
      .getOne();
  }

  async joinMatch(matchId: string, context: Context): Promise<MatchPlayer> {
    const match = await this.getMatch(matchId);
    if (match.matchStatusId !== MatchStatusEnum.pending) {
      throw new ValidationError({
        errorStatus: ErrorStatusEnum.matchCannotJoinStartedMatch,
        message: 'Cannot join started match'
      });
    }

    const alreadyJoinUser = match.players.find(p => p.userId === context.userId);
    if (alreadyJoinUser) {
      return alreadyJoinUser;
    }

    await this.preventCreatingMultipleMatches(context.userId);

    const player = new MatchPlayer();
    player.match = match;
    player.user = await this.entityManager.findOne(User, context.userId);
    player.slot = Math.max(...match.players.map(p => p.slot)) + 1;
    player.isAi = false;
    player.playerName = player.user.userName;

    const game = await this.entityManager.findOne(Game, match.gameId);
    if (game.maxPlayers === (match.players.length + 1)) {
      match.matchStatus = await this.entityManager.findOne(MatchStatus, MatchStatusEnum.inProgress);
    }

    await this.entityManager.transaction(async em => {
      console.log(player)
      await em.save(match);
      await em.save(player);
    });

    return player;
  }

  async createMatch(payload: CreateMatchPayload, context: Context): Promise<Match> {
    await this.preventCreatingMultipleMatches(context.userId);

    const game = await this.getGame(payload.gameId);
    const totalFreeSlots = game.maxPlayers - 1;
    if (payload.players?.length != totalFreeSlots) {
      throw new ValidationError(`Invalid number of players`);
    }

    const match = new Match();
    match.game = game;

    let currentSlotNumber = 1;
    const firstPlayer = new MatchPlayer();
    firstPlayer.user = await this.entityManager.findOne(User, context.userId);
    firstPlayer.slot = currentSlotNumber;
    firstPlayer.playerName = firstPlayer.user.userName;
    firstPlayer.isAi = false;
    currentSlotNumber++;

    let aiPlayerIndex = 1;
    const extraPlayers = await Promise.all(payload.players.filter(p => p.isAi)
      .map(async payloadPlayer => {
        const player = new MatchPlayer();
        player.slot = currentSlotNumber;
        currentSlotNumber++;
        player.isAi = true;
        player.playerName = `AI-${ aiPlayerIndex }`;
        aiPlayerIndex++;
        player.difficulty = await this.getDifficulty(payloadPlayer.aiDifficulty);

        return player;
      }));

    match.players = [firstPlayer, ...extraPlayers];
    const matchStatusId = (match.players.length === game.maxPlayers) ? MatchStatusEnum.inProgress : MatchStatusEnum.pending;
    match.matchStatus = await this.entityManager.findOne(MatchStatus, matchStatusId);

    return this.entityManager.save(match);
  }

  private async preventCreatingMultipleMatches(userId: number): Promise<void> {
    const ongoingMatch = await this.getUserOnGoingMatch(userId);
    if (!ongoingMatch) {
      return;
    }

    throw new ValidationError({
      errorStatus: ErrorStatusEnum.matchCannotCreateMultipleMatches,
      message: 'Cannot create multiple matches'
    });
  }

  private async getGame(id: number): Promise<Game> {
    const game = await this.entityManager.findOne(Game, id);
    if (!game) {
      throw new ValidationError(`Invalid game id: ${ id }`);
    }

    return game;
  }

  private async getDifficulty(id: number): Promise<Difficulty> {
    const difficulty = await this.entityManager.findOne(Difficulty, id);
    if (!difficulty) {
      throw new ValidationError(`Invalid difficulty id: ${ id }`);
    }

    return difficulty;
  }
}
