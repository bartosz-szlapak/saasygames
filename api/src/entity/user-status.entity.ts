import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserStatus {

  @PrimaryColumn()
  id: number;

  @Column({type: 'varchar', length: 32})
  name: string;
}
