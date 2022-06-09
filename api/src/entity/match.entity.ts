import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import * as moment from 'moment';
import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';
import { Game } from '@app/entity/game.entity';
import { MatchStatus } from '@app/entity/match-status.entity';
import { MatchPlayer } from '@app/entity/match-player.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Game, c => c.id, {nullable: false})
  game: Game;

  @RelationId((f: Match) => f.game)
  gameId: number;

  @Exclude()
  @ManyToOne(type => MatchStatus, c => c.id, {nullable: false})
  matchStatus: MatchStatus;

  @RelationId((f: Match) => f.matchStatus)
  matchStatusId: number;

  @Column({type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  @Transform((value: TransformFnParams) => moment(value.value).toISOString())
  createdAt: string;

  @OneToMany(() => MatchPlayer, mu => mu.match, {cascade: true})
  players: MatchPlayer[];
}
