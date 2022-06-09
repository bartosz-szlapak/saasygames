import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormErrorsModule } from '@root/app/shared/utils/form/form-errors/form-errors.module';
import {
  RegistrationFormComponent
} from './components/registration-content/registration-form/registration-form.component';
import {
  GetFormControlPipeModule
} from '@root/app/shared/utils/form/get-form-control-pipe/get-form-control-pipe.module';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationContentComponent } from './components/registration-content/registration-content.component';
import {
  CreteAccountRoutingModule
} from '@root/app/main/modules/auth/modules/create-account/crete-account-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  CreateUserPasswordInputModule
} from '@root/app/shared/modules/create-user-password-input/create-user-password-input.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreModule } from '@ngrx/store';
import {
  createAccountReducer,
  STATE_NAME
} from '@root/app/main/modules/auth/modules/create-account/store/create-account.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CreateAccountEffects } from '@root/app/main/modules/auth/modules/create-account/store/create-account.effects';
import { MatButtonSpinnerModule } from '@root/app/shared/modules/mat-button-spinner/mat-button-spinner.module';


@NgModule({
  declarations: [
    CreateAccountComponent,
    RegistrationFormComponent,
    RegistrationContentComponent,
  ],
  imports: [
    CommonModule,
    CreteAccountRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormErrorsModule,
    GetFormControlPipeModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CreateUserPasswordInputModule,
    MatCheckboxModule,
    StoreModule.forFeature(STATE_NAME, createAccountReducer),
    EffectsModule.forFeature([CreateAccountEffects]),
    MatButtonSpinnerModule,
  ],
})
export class CreateAccountModule {
}
