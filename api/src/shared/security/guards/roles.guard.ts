import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '@app/shared/role/role.enum';
import { ROLES_KEY } from '@app/shared/security/roles.decorator';
import { Context } from '@app/shared/context/context';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class RolesGuard extends AuthGuard('jwt') {

  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user: Context = context.switchToHttp().getRequest().user;
    if (!user) {
      return false;
    }


    return requiredRoles.includes(user.roleId);
  }
}
