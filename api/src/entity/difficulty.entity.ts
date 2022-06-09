import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Difficulty {

  @PrimaryColumn()
  id: number;

  @Column({type: 'varchar', length: 128})
  name: string;
}
