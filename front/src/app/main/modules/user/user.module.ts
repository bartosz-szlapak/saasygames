import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from '@root/app/main/modules/user/user-routing.module';
import { StoreModule } from '@ngrx/store';
import { STATE_NAME, userReducer, } from '@root/app/main/modules/user/store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@root/app/main/modules/user/store/user.effects';
import { UserContentComponent } from './components/user-content/user-content.component';
import { UserSkeletonComponent } from './components/user-skeleton/user-skeleton.component';
import { ApplicationErrorModule } from '@root/app/shared/modules/application-error/application-error.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorsModule } from '@root/app/shared/utils/form/form-errors/form-errors.module';
import { MatButtonModule } from '@angular/material/button';
import { YesNoDialogModule } from '@root/app/shared/modules/yes-no-dialog/yes-no-dialog.module';
import { GetRoleModule } from '@root/app/shared/pipes/get-role/get-role.module';
import { GetUserStatusModule } from '@root/app/shared/pipes/get-user-status/get-user-status.module';


@NgModule({
  declarations: [
    UserComponent,
    UserContentComponent,
    UserSkeletonComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(STATE_NAME, userReducer),
    EffectsModule.forFeature([UserEffects]),
    ApplicationErrorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormErrorsModule,
    MatButtonModule,
    YesNoDialogModule,
    GetRoleModule,
    GetUserStatusModule,
  ],
})
export class UserModule {
}
