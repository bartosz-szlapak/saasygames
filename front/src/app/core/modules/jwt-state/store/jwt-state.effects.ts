import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import {
  logOut,
  requestJwtRestoration,
  updateAccessToken,
  updateDecodedAccessToken,
  updateRefreshToken,
} from './jwt-state.actions';
import { JwtStorageService } from '../services/jwt-storage.service';
import { JwtService } from '@root/app/shared/utils/jwt/jwt.service';

@Injectable()
export class JwtStateEffects {

  jwtRestorationRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestJwtRestoration),
      mergeMap(() => {
        const accessToken = this.jwtStorageService.getAccessToken();
        const refreshToken = this.jwtStorageService.getRefreshToken();

        return [
          updateAccessToken({accessToken}),
          updateRefreshToken({refreshToken}),
        ];
      }),
    ));

  updateAccessTokenSaveToStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAccessToken),
      tap((action) => {
        this.jwtStorageService.saveAccessToken(action.accessToken);
      }),
    ), {dispatch: false},
  );

  updateAccessTokenSaveDecoded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAccessToken),
      map((action) => {
        const decodedAccessToken = this.jwtService.decode(action.accessToken);

        return updateDecodedAccessToken({decodedAccessToken});
      }),
    ),
  );

  updateRefreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRefreshToken),
      tap((action) => {
        this.jwtStorageService.saveRefreshToken(action.refreshToken);
      }),
    ), {dispatch: false},
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logOut),
      tap(() => {
        this.jwtStorageService.clear();
      }),
    ), {dispatch: false},
  );


  constructor(
    private readonly actions$: Actions,
    private readonly jwtStorageService: JwtStorageService,
    private readonly jwtService: JwtService,
  ) {
  }
}
