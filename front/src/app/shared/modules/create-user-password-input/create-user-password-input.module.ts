import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CreateUserPasswordInputComponent
} from '@root/app/shared/modules/create-user-password-input/create-user-password-input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  exports: [CreateUserPasswordInputComponent],
  declarations: [CreateUserPasswordInputComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class CreateUserPasswordInputModule {
}
