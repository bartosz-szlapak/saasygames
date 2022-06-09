import { RoleEnum } from '@app/shared/role/role.enum';

export interface Context {
  readonly userId: number;
  readonly roleId: RoleEnum;

  notEmpty(): boolean;
}
