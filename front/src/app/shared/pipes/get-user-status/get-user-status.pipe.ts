import { Pipe, PipeTransform } from '@angular/core';
import { UserStatusEnum } from '@root/app/shared/models/user-status.enum';

@Pipe({
  name: 'getUserStatus'
})
export class GetUserStatusPipe implements PipeTransform {


  transform(userStatusId: number): string {
    const statues = {
      [UserStatusEnum.active]: 'active',
      [UserStatusEnum.banned]: 'banned',
    };

    return statues[userStatusId];
  }

}
