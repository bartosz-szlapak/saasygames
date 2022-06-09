import { Pipe, PipeTransform } from '@angular/core';
import { RoleEnum } from '@root/app/shared/models/role.enum';

@Pipe({
  name: 'getRole'
})
export class GetRolePipe implements PipeTransform {

  transform(roleId: number): string {
    const roles = {
      [RoleEnum.user]: 'user',
      [RoleEnum.administrator]: 'administrator',
    };

    return roles[roleId];
  }

}
