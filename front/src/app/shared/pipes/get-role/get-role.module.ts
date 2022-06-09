import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetRolePipe } from '@root/app/shared/pipes/get-role/get-role.pipe';


@NgModule({
  declarations: [GetRolePipe],
  exports: [GetRolePipe],
  imports: [
    CommonModule
  ]
})
export class GetRoleModule {
}
