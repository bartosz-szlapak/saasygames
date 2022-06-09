import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 128})
  name: string;

  @Column({type: 'integer'})
  minPlayers: number;

  @Column({type: 'integer'})
  maxPlayers: number;

  @Column({type: 'integer'})
  maxMoveTime: number;
}
