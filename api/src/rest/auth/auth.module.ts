import { Module } from '@nestjs/common';
import {
  AuthenticateByCredentialsService
} from './service/authenticate-by-credentials/authenticate-by-credentials.service';
import { AuthController } from './auth.controller';
import { RefreshTokenService } from '@app/rest/auth/service/refresh-token/refresh-token.service';
import { UserStatusCheckerService } from '@app/rest/auth/service/user-status-checker.service';

@Module({
  providers: [
    AuthenticateByCredentialsService,
    RefreshTokenService,
    UserStatusCheckerService,
  ],
  controllers: [AuthController],
})
export class AuthModule {
}
