import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@app/entity/user.entity';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { AccessToken } from '@app/shared/security/token/access-token';
import { RefreshToken } from '@app/shared/security/token/refresh-token';
import { ConfigService } from '@app/shared/config/config.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
  }

  async createToken(user: User): Promise<string> {
    const payload: AccessToken = {
      userId: user.id,
      userName: user.userName,
      roleId: user.roleId,
    };

    return this.jwtService.signAsync(payload, this.getAccessTokenOptions());
  }

  async createRefreshToken(user: User): Promise<string> {
    const payload: RefreshToken = {
      userId: user.id,
      userName: user.userName,
      roleId: user.roleId,
    };

    return this.jwtService.sign(payload, this.getRefreshTokenOptions());
  }

  decodeToken(token: string): AccessToken {
    return this.jwtService.decode(token) as AccessToken;
  }

  async validateToken(token: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.jwtService.verifyAsync(token)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  private getAccessTokenOptions(): JwtSignOptions {
    return {
      expiresIn: this.configService.config.tokenTtlInSeconds,
    }
  }

  private getRefreshTokenOptions(): JwtSignOptions {
    return {
      expiresIn: this.configService.config.refreshTokenTtlInSeconds,
    }
  }
}
