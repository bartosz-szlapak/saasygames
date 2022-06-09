import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '@root/app/main/modules/auth/auth-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {
}
