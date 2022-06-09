import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { requestUsers, requestUsersError, requestUsersSuccess, } from './users.actions';
import { APPLICATION_ERROR_MESSAGE } from '@root/app/shared/modules/application-error/translations';
import { NotificationService } from '@root/app/shared/services/notification.service';
import { UsersService } from '@root/app/shared/user/users.service';

@Injectable()
export class UsersEffects {

  requestUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestUsers),
      mergeMap((action) => {
        return this.usersService.getUsers(action.payload).pipe(
          switchMap(response => of(requestUsersSuccess({response}))),
          catchError((error) => of(requestUsersError({error}))),
        );
      }),
    ),
  );

  requestUsersError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestUsersError),
      tap(() => this.notificationService.error(APPLICATION_ERROR_MESSAGE)),
    ), {dispatch: false},
  );

  constructor(
    private readonly actions$: Actions,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
  ) {
  }
}
