import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserRegistrationByCredentialsService } from '@app/rest/user/services/user-registration-by-credentials.service';
import { UserNameAvailabilityService } from '@app/shared/user-name-availability.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRegistrationByCredentialsService,
    UserNameAvailabilityService,
  ],
})
export class UserModule {
}
