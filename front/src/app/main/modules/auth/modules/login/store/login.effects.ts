import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loginByCredentials, loginByCredentialsFailed, loginByCredentialsSuccess, } from './login.actions';
import { APPLICATION_ERROR_MESSAGE } from '@root/app/shared/modules/application-error/translations';
import { NotificationService } from '@root/app/shared/services/notification.service';
import { updateAccessToken, updateRefreshToken } from '@root/app/core/modules/jwt-state/store/jwt-state.actions';
import { LoginService } from '@root/app/main/modules/auth/modules/login/services/login.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {

  loginByCredentials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginByCredentials),
      mergeMap(action => {
        return this.loginService.loginByCredentials(action.payload.userName, action.payload.password).pipe(
          switchMap(response => of(loginByCredentialsSuccess({response, returnUrl: action.payload.returnUrl}))),
          catchError((error) => {
            const message = error.status === 400 ? 'User name or password are invalid' : APPLICATION_ERROR_MESSAGE;

            return of(loginByCredentialsFailed({error: message}));
          }),
        );
      }),
    ),
  );

  loginByCredentialsFailedShowError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginByCredentialsFailed),
      tap((action) => this.notificationService.error(action.error)),
    ), {dispatch: false},
  );

  loginByCredentialsSuccessUpdateTokens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginByCredentialsSuccess),
      mergeMap(({response}) => [
        updateAccessToken({accessToken: response.accessToken}),
        updateRefreshToken({refreshToken: response.refreshToken}),
      ]),
    ));

  loginByCredentialsSuccessRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginByCredentialsSuccess),
      tap((action) => {
        this.router.navigateByUrl(action.returnUrl ?? '/');
        this.notificationService.success('User logged in');
      }),
    ), {dispatch: false},
  );

  constructor(
    private readonly loginService: LoginService,
    private readonly actions$: Actions,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) {
  }
}
