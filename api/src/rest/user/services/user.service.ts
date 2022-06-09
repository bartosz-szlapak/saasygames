import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { GetUsersPayload } from '@app/rest/user/models/get-users.payload';
import { PageableResponse } from '@app/shared/pageable-response/pageable-response';
import { User } from '@app/entity/user.entity';
import { UpdateUserPayload } from '@app/rest/user/models/update-user.payload';
import { GetUserNameAvailabilityPayload } from '@app/rest/user/models/get-user-name-availability.payload';
import { GetUserNameAvailabilityResponse } from '@app/rest/user/models/get-user-name-availability.response';
import { UserNameAvailabilityService } from '@app/shared/user-name-availability.service';
import { UserStatus } from '@app/entity/user-status.entity';

@Injectable()
export class UserService {

  constructor(
    private readonly entityManager: EntityManager,
    private readonly userNameAvailabilityService: UserNameAvailabilityService
  ) {
  }

  async updateUser(userId: number, payload: UpdateUserPayload): Promise<User> {
    const user = await this.getUser(userId);
    if (payload.statusId) {
      user.status = await this.entityManager.findOneOrFail(UserStatus, payload.statusId);
    }

    return this.entityManager.save(user);
  }

  async getUser(userId: number): Promise<User> {
    return this.entityManager.createQueryBuilder()
      .select('u')
      .from(User, 'u')
      .where('u.id = :userId', {userId})
      .getOneOrFail();
  }

  async getUsers(payload: GetUsersPayload): Promise<PageableResponse<User>> {
    const query = this.entityManager.createQueryBuilder()
      .select('u')
      .from(User, 'u')

    if (payload.offset) {
      query.offset(payload.offset);
    }

    if (payload.limit) {
      query.limit(payload.limit);
    }

    const [items, count] = await query.getManyAndCount();

    return new PageableResponse<User>(count, items, payload.limit, payload.offset);
  }

  async getUserNameAvailability(payload: GetUserNameAvailabilityPayload): Promise<GetUserNameAvailabilityResponse> {
    return {isAvailable: await this.userNameAvailabilityService.isUserNameAvailable(payload.userName)};
  }
}
