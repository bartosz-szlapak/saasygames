import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PasswordEncoderService } from '@app/shared/security/password-encoder.service';
import { User } from '@app/entity/user.entity';
import {
  AuthenticateByCredentialsBody
} from '@app/rest/auth/service/authenticate-by-credentials/authenticate-by-credentials.body';
import { AuthenticateResponse } from '@app/rest/auth/service/authenticate-by-credentials/authenticate-response';
import { TokenService } from '@app/shared/security/token/token.service';
import { InvalidPasswordException } from '@app/rest/auth/exception/invalid-password.exception';
import { UserStatusCheckerService } from '@app/rest/auth/service/user-status-checker.service';
import { UserNotFoundException } from '@app/rest/auth/exception/user-not-found.exception';
import { UserInactiveException } from '@app/rest/auth/exception/user-inactive.exception';

@Injectable()
export class AuthenticateByCredentialsService {

  constructor(
    private readonly entityManager: EntityManager,
    private readonly passwordEncoderService: PasswordEncoderService,
    private readonly tokenService: TokenService,
    private readonly userStatusCheckerService: UserStatusCheckerService
  ) {
  }

  async authenticateByCredentials(credentials: AuthenticateByCredentialsBody): Promise<AuthenticateResponse> {
    const user = await this.getUserByUserName(credentials.userName);
    if (!user) {
      throw new UserNotFoundException();
    }

    if (this.userStatusCheckerService.isUserInactive(user)) {
      throw new UserInactiveException();
    }

    const isPasswordValid = await this.isPasswordValid(user, credentials);
    if (!isPasswordValid) {
      throw new InvalidPasswordException();
    }

    return this.generateJwt(user);
  }

  async getUserByUserName(userName: string): Promise<User> {
    return this.entityManager.createQueryBuilder()
      .select('u')
      .from(User, 'u')
      .where('u.userName = :userName', {userName})
      .getOne();
  }

  private isPasswordValid(user: User, credentials: AuthenticateByCredentialsBody): Promise<boolean> {
    return this.passwordEncoderService.validate(user.passwordHash, credentials.password);
  }

  private async generateJwt(user: User): Promise<AuthenticateResponse> {
    return {
      accessToken: await this.tokenService.createToken(user),
      refreshToken: await this.tokenService.createRefreshToken(user),
    }
  }
}
