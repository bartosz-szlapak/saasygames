import { User } from '@app/entity/user.entity';
import { UserStatusEnum } from '@app/shared/user-status/user-status.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserStatusCheckerService {
  isUserInactive(user: User): boolean {
    return user.statusId !== UserStatusEnum.active;
  }
}
