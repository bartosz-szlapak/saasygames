import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginRoutingModule } from '@root/app/main/modules/auth/modules/login/login-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { loginReducer, STATE_NAME } from '@root/app/main/modules/auth/modules/login/store/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from '@root/app/main/modules/auth/modules/login/store/login.effects';
import { MatButtonSpinnerModule } from '@root/app/shared/modules/mat-button-spinner/mat-button-spinner.module';
import { LoginContentComponent } from './components/login-content/login-content.component';


@NgModule({
  exports: [LoginComponent],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    LoginContentComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature(STATE_NAME, loginReducer),
    EffectsModule.forFeature([LoginEffects]),
    MatButtonSpinnerModule,
  ],
})
export class LoginModule {
}
