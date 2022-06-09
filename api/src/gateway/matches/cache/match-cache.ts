import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheKeyEnum } from '@app/gateway/matches/cache/cache-key.enum';
import { MatchStateInterface } from '@app/gateway/matches/games/match-state.interface';

@Injectable()
export class MatchCache {

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
  }

  private buildKey(cacheType: CacheKeyEnum, matchId: string): string {
    return `${ cacheType }_${ matchId }`;
  }

  async setMatchState(matchId: string, state: MatchStateInterface<any>): Promise<void> {
    const key = this.buildKey(CacheKeyEnum.gameState, matchId);
    await this.cacheManager.set(key, state);
  }

  async getMatchState(matchId: string): Promise<MatchStateInterface<any>> {
    const key = this.buildKey(CacheKeyEnum.gameState, matchId);

    return this.cacheManager.get(key);
  }
}
