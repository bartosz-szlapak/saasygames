import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '@app/entity/role.entity';
import { UserStatus } from '@app/entity/user-status.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({type: 'varchar', length: 512, nullable: true})
  passwordHash: string;

  @Column({type: 'varchar', length: 32, unique: true})
  userName: string;

  @Exclude()
  @ManyToOne(type => Role, c => c.id, {nullable: false})
  role: Role;

  @RelationId((u: User) => u.role)
  roleId: number;

  @Exclude()
  @ManyToOne(type => UserStatus, c => c.id, {nullable: false})
  status: UserStatus;

  @RelationId((u: User) => u.status)
  statusId: number;
}
