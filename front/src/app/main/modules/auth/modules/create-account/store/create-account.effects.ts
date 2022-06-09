import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createAccount, createAccountError, createAccountSuccess, } from './create-account.actions';
import { APPLICATION_ERROR_MESSAGE } from '@root/app/shared/modules/application-error/translations';
import { NotificationService } from '@root/app/shared/services/notification.service';
import { updateAccessToken, updateRefreshToken } from '@root/app/core/modules/jwt-state/store/jwt-state.actions';
import { LoginService } from '@root/app/main/modules/auth/modules/login/services/login.service';
import { RegistrationService } from '@root/app/main/modules/auth/modules/create-account/services/registration.service';
import { Router } from '@angular/router';

@Injectable()
export class CreateAccountEffects {

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAccount),
      mergeMap((action) => {
        return this.registrationService.createAccountByCredentials(action.userData).pipe(
          switchMap(response => {
            return [
              createAccountSuccess({returnUrl: action.returnUrl}),
              updateAccessToken({accessToken: response.accessToken}),
              updateRefreshToken({refreshToken: response.refreshToken}),
            ];
          }),
          catchError((error) => {
            return of(createAccountError({error}));
          }),
        );
      }),
    ),
  );

  createAccountError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAccountError),
      tap(action => {
        this.notificationService.error(APPLICATION_ERROR_MESSAGE);
      }),
    ), {dispatch: false},
  );

  createAccountSuccessShowMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAccountSuccess),
      tap(action => {
        this.notificationService.success('Account created');
      }),
    ), {dispatch: false},
  );

  createAccountSuccessRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAccountSuccess),
      tap(action => {
        const url = action.returnUrl ?? '/';
        this.router.navigateByUrl(url);
      }),
    ), {dispatch: false},
  );


  constructor(
    private readonly loginService: LoginService,
    private readonly actions$: Actions,
    private readonly notificationService: NotificationService,
    private readonly registrationService: RegistrationService,
    private readonly router: Router,
  ) {
  }
}
