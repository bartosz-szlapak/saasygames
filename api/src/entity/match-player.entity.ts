import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Match } from '@app/entity/match.entity';
import { User } from '@app/entity/user.entity';
import { Difficulty } from '@app/entity/difficulty.entity';

@Entity()
export class MatchPlayer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @ManyToOne(type => Match, t => t.id, {nullable: false})
  match: Match;

  @RelationId((f: MatchPlayer) => f.match)
  matchId: number;

  @Exclude()
  @ManyToOne(type => User, c => c.id, {nullable: true})
  user: User;

  @RelationId((f: MatchPlayer) => f.user)
  userId: number;

  @Column({type: 'varchar', length: 128})
  playerName: string;

  @Exclude()
  @ManyToOne(type => Difficulty, c => c.id, {nullable: true})
  difficulty: Difficulty;

  @RelationId((f: MatchPlayer) => f.difficulty)
  difficultyId: number;

  @Column({type: 'integer'})
  slot: number;

  @Column({type: 'boolean', default: false})
  isWinner: boolean;

  @Column({type: 'boolean'})
  isAi: boolean;
}
