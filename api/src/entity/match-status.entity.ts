import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class MatchStatus {
  @PrimaryColumn()
  id: number;

  @Column({type: 'varchar', length: 128, nullable: false})
  name: string;
}
