import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '@app/entity/user.entity';
import { TokenService } from '@app/shared/security/token/token.service';
import { RefreshTokenBody } from '@app/rest/auth/service/refresh-token/refresh-token.body';
import { TokenNotValidException } from '@app/rest/auth/service/verify-token/token-not-valid.exception';
import { RefreshTokenResponse } from '@app/rest/auth/service/refresh-token/refresh-token-response';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '@app/shared/security/token/refresh-token';
import { UserStatusCheckerService } from '@app/rest/auth/service/user-status-checker.service';

@Injectable()
export class RefreshTokenService {

  constructor(
    private readonly entityManager: EntityManager,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    private readonly userStatusCheckerService: UserStatusCheckerService
  ) {
  }

  async refreshToken(refreshTokenBody: RefreshTokenBody): Promise<RefreshTokenResponse> {
    const refreshToken = this.jwtService.decode(refreshTokenBody.refreshToken) as RefreshToken;

    const isValid = await this.tokenService.validateToken(refreshTokenBody.refreshToken);
    if (!isValid) {
      throw new TokenNotValidException();
    }

    const user = await this.entityManager.findOneOrFail<User>(User, refreshToken.userId);
    if (!user) {
      throw new TokenNotValidException();
    }

    if (this.userStatusCheckerService.isUserInactive(user)) {
      throw new TokenNotValidException();
    }

    const accessToken = await this.tokenService.createToken(user);

    return {accessToken};
  }
}
