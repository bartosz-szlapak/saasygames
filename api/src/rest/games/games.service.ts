import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Game } from '@app/entity/game.entity';
import { GetGamesParams } from '@app/rest/games/models/get-games.params';
import { PageableResponse } from '@app/shared/pageable-response/pageable-response';

@Injectable()
export class GamesService {

  constructor(
    private readonly entityManager: EntityManager,
  ) {
  }

  async getGames(params: GetGamesParams): Promise<PageableResponse<Game>> {
    const query = this.entityManager.createQueryBuilder()
      .select('m')
      .from(Game, 'm')
      .limit(params.limit)
      .offset(params.offset)
      .orderBy('m.name', 'ASC');

    const [items, count] = await query.getManyAndCount();

    return new PageableResponse<Game>(count, items, params.limit, params.offset);
  }

  getGame(id: number): Promise<Game> {
    return this.entityManager.findOneOrFail(Game, id);
  }
}
