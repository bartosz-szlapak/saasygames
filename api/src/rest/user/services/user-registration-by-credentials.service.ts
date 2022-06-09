import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '@app/entity/user.entity';
import { RegisterUserByCredentialsPayload } from '@app/rest/user/models/register-user-by-credentials.payload';
import { Role } from '@app/entity/role.entity';
import { RoleEnum } from '@app/shared/role/role.enum';
import { UserStatus } from '@app/entity/user-status.entity';
import { UserStatusEnum } from '@app/shared/user-status/user-status.enum';
import { PasswordEncoderService } from '@app/shared/security/password-encoder.service';
import { RegisterUserResponse } from '@app/rest/user/models/register-user.response';
import { ValidationError } from '@app/shared/exception/exceptions/validation.error';
import { TokenService } from '@app/shared/security/token/token.service';
import { ErrorStatusEnum } from '@app/shared/error/error-status.enum';
import { UserNameAvailabilityService } from '@app/shared/user-name-availability.service';

@Injectable()
export class UserRegistrationByCredentialsService {

  constructor(
    private readonly entityManager: EntityManager,
    private readonly passwordEncoderService: PasswordEncoderService,
    private readonly tokenService: TokenService,
    private readonly userNameAvailabilityService: UserNameAvailabilityService,
  ) {
  }

  async registerUser(payload: RegisterUserByCredentialsPayload): Promise<RegisterUserResponse> {
    if (!(await this.userNameAvailabilityService.isUserNameAvailable(payload.userName))) {
      throw new ValidationError({
        errorStatus: ErrorStatusEnum.userUserNameAlreadyRegistered,
        message: 'User name is already registered'
      });
    }

    const user = new User();
    user.role = await this.entityManager.findOne(Role, RoleEnum.user);
    user.status = await this.entityManager.findOne(UserStatus, UserStatusEnum.active);
    user.passwordHash = await this.passwordEncoderService.encode(payload.password);
    user.userName = payload.userName;
    await this.entityManager.save(user);

    return {
      user,
      accessToken: await this.tokenService.createToken(user),
      refreshToken: await this.tokenService.createRefreshToken(user),
    };
  }

}
