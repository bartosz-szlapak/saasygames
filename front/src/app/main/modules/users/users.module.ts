import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { StoreModule } from '@ngrx/store';
import { STATE_NAME, usersReducer, } from '@root/app/main/modules/users/store/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from '@root/app/main/modules/users/store/users.effects';
import { ApplicationErrorModule } from '@root/app/shared/modules/application-error/application-error.module';
import { UsersBodyComponent } from './components/users-body/users-body.component';
import { UsersSkeletonComponent } from './components/users-skeleton/users-skeleton.component';
import { UsersListComponent } from './components/users-body/users-list/users-list.component';
import { PaginatorModule } from '@root/app/shared/modules/paginator/paginator.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToArrayModule } from '@root/app/shared/pipes/to-array/to-array.module';
import { UsersRoutingModule } from '@root/app/main/modules/users/users-routing.module';
import { GetRoleModule } from '@root/app/shared/pipes/get-role/get-role.module';
import { GetUserStatusModule } from '@root/app/shared/pipes/get-user-status/get-user-status.module';


@NgModule({
  declarations: [
    UsersComponent,
    UsersBodyComponent,
    UsersSkeletonComponent,
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature(STATE_NAME, usersReducer),
    EffectsModule.forFeature([UsersEffects]),
    ApplicationErrorModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    ToArrayModule,
    PaginatorModule,
    GetRoleModule,
    GetUserStatusModule,
  ],
})
export class UsersModule {
}
