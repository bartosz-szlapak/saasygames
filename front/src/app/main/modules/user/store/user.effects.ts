import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from '@root/app/shared/services/notification.service';
import {
  banUser,
  banUserError,
  banUserSuccess,
  requestUser,
  requestUserError,
  requestUserSuccess,
} from '@root/app/main/modules/user/store/user.actions';
import { Router } from '@angular/router';
import { UsersService } from '@root/app/shared/user/users.service';
import { requestMatchesError } from '@root/app/main/modules/matches/store/matches.actions';
import { APPLICATION_ERROR_MESSAGE } from '@root/app/shared/modules/application-error/translations';
import { UserStatusEnum } from '@root/app/shared/models/user-status.enum';

@Injectable()
export class UserEffects {
  requestUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestUser),
      mergeMap((action) => {
        return this.userService.getUser(action.id).pipe(
          switchMap(user => of(requestUserSuccess({user}))),
          catchError((error) => of(requestUserError({error}))),
        );
      }),
    ),
  );

  banUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(banUser),
      mergeMap((action) => {
        return this.userService.update(action.id, {statusId: UserStatusEnum.banned}).pipe(
          switchMap(user => of(banUserSuccess({user}))),
          catchError((error) => of(banUserError({error}))),
        );
      }),
    ),
  );

  banUserError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestMatchesError),
      tap(() => this.notificationService.error(APPLICATION_ERROR_MESSAGE)),
    ), {dispatch: false},
  );

  banUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(banUserSuccess),
      tap(() => this.notificationService.error('User banned')),
    ), {dispatch: false},
  );

  constructor(
    private readonly actions$: Actions,
    private readonly userService: UsersService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) {
  }
}
