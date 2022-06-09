import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUserStatusPipe } from '@root/app/shared/pipes/get-user-status/get-user-status.pipe';


@NgModule({
  declarations: [GetUserStatusPipe],
  exports: [GetUserStatusPipe],
  imports: [
    CommonModule
  ]
})
export class GetUserStatusModule {
}
