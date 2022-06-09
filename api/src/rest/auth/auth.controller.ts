import { BadRequestException, Body, Controller, HttpCode, Post, UseInterceptors, UsePipes } from '@nestjs/common';
import {
  AuthenticateByCredentialsService
} from './service/authenticate-by-credentials/authenticate-by-credentials.service';
import { AuthenticateByCredentialsBody } from './service/authenticate-by-credentials/authenticate-by-credentials.body';
import { UserAuthenticationException } from './exception/user-authentication.exception';
import { AuthenticateResponse } from '@app/rest/auth/service/authenticate-by-credentials/authenticate-response';
import { RefreshTokenBody } from '@app/rest/auth/service/refresh-token/refresh-token.body';
import { RefreshTokenService } from '@app/rest/auth/service/refresh-token/refresh-token.service';
import { RefreshTokenResponse } from '@app/rest/auth/service/refresh-token/refresh-token-response';
import { Validate } from '@app/shared/validation/validate.pipe';
import { TransformResponseInterceptor } from '@app/shared/transform-response.interceptor';
import { Public } from '@app/shared/public-endpoint.decorator';

@Controller('auth')
@UsePipes(Validate())
@UseInterceptors(TransformResponseInterceptor)
export class AuthController {

  constructor(
    private readonly authenticateByCredentialsService: AuthenticateByCredentialsService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
  }

  @Post('token')
  @Public()
  @HttpCode(200)
  async authenticateByCredentials(@Body() body: AuthenticateByCredentialsBody): Promise<AuthenticateResponse> {
    try {
      return await this.authenticateByCredentialsService.authenticateByCredentials(body);
    } catch (exception) {
      if (exception instanceof UserAuthenticationException) {
        throw new BadRequestException(exception.message)
      }

      throw exception;
    }
  }

  @Post('refresh-token')
  @Public()
  refreshToken(
    @Body() body: RefreshTokenBody,
  ): Promise<RefreshTokenResponse> {
    return this.refreshTokenService.refreshToken(body);
  }
}
