import { Context } from '@app/shared/context/context';
import { RoleEnum } from '@app/shared/role/role.enum';

export class UserContext implements Context {

  readonly roleId: RoleEnum;
  readonly userId: number;

  constructor(
    params?: { roleId: RoleEnum, userId: number }
  ) {
    if (params) {
      this.roleId = params.roleId;
      this.userId = params.userId;
    }
  }

  notEmpty(): boolean {
    return this.roleId != null && this.userId != null;
  }
}
