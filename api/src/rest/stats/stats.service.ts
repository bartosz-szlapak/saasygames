import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Match } from '@app/entity/match.entity';
import { MatchStatusEnum } from '@app/shared/match-status/match-status.enum';
import { PlatformStats } from '@app/rest/stats/models/platform-stats';
import { UserStats } from '@app/rest/stats/models/user-stats';

@Injectable()
export class StatsService {

  constructor(
    private readonly entityManager: EntityManager,
  ) {
  }

  async getPlatformStats(): Promise<PlatformStats> {
    const totalMatches = await this.entityManager.createQueryBuilder()
      .select('m.id')
      .from(Match, 'm')
      .innerJoin('m.matchStatus', 'ms')
      .where('ms.id = :statusId', {statusId: MatchStatusEnum.finished})
      .getCount();

    const ongoingMatches = await this.entityManager.createQueryBuilder()
      .select('m.id')
      .from(Match, 'm')
      .innerJoin('m.matchStatus', 'ms')
      .where('ms.id = :statusId', {statusId: MatchStatusEnum.inProgress})
      .getCount();

    return {totalMatches, ongoingMatches};
  }

  async getUserStats(userId: number): Promise<UserStats> {
    const totalMatches = await this.entityManager.createQueryBuilder()
      .select('m.id')
      .from(Match, 'm')
      .innerJoin('m.matchStatus', 'ms')
      .innerJoin('m.players', 'mp')
      .innerJoin('mp.user', 'u')
      .where('ms.id = :statusId', {statusId: MatchStatusEnum.finished})
      .andWhere('u.id = :userId', {userId})
      .getCount();

    const wonMatches = await this.entityManager.createQueryBuilder()
      .select('m.id')
      .from(Match, 'm')
      .innerJoin('m.matchStatus', 'ms')
      .innerJoin('m.players', 'mp')
      .innerJoin('mp.user', 'u')
      .where('ms.id = :statusId', {statusId: MatchStatusEnum.finished})
      .andWhere('u.id = :userId', {userId})
      .andWhere('mp.isWinner = true')
      .getCount();

    return {totalMatches, wonMatches};
  }
}
