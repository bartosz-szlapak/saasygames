import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Context } from '@app/shared/context/context';
import { UserContext } from '@app/shared/context/user-context';


export const GetContext = createParamDecorator((data, ctx: ExecutionContext): Context => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.user) {
    return new UserContext();
  }

  return new UserContext({
    userId: request.user.userId,
    roleId: request.user.roleId,
  })
});
