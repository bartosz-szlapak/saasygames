import { User } from '@app/entity/user.entity';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserNameAvailabilityService {
  constructor(
    private readonly entityManager: EntityManager,
  ) {
  }

  async isUserNameAvailable(userName: string): Promise<boolean> {
    if (!this.isUsernameValid(userName)) {
      return false;
    }

    const user = await this.entityManager.createQueryBuilder()
      .select('u.id')
      .from(User, 'u')
      .where('u.userName = :userName', {userName})
      .getOne();

    return !user;
  }

  private isUsernameValid(username: string): boolean {
    const regexp = new RegExp('^[0-9a-z]{4,32}$', 'i');

    return regexp.test(username);
  }
}
