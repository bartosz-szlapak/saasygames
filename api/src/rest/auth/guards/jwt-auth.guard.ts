import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@app/shared/public-endpoint.decorator';
import { IncomingHttpHeaders } from 'http';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(
    private readonly reflector: Reflector,
  ) {
    super();
  }

  handleRequest(err, user, info, context) {
    // if user is present it means that token is valid
    if (user) {
      return user;
    }

    // if request contains authorization header - always authorize even if endpoint is public
    const headers = (context as ExecutionContext).switchToHttp().getRequest().headers as IncomingHttpHeaders;
    if (headers.authorization?.startsWith('Bearer')) {
      throw new UnauthorizedException();
    }

    // if endpoint is public - continue with undefined user
    const isPublic = this.reflector.get<string[]>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return undefined;
    }

    // all other requests are unauthorized
    throw new UnauthorizedException();
  }
}
