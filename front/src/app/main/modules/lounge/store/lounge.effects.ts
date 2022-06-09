import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  joinMatch,
  joinMatchError,
  joinMatchSuccess,
  requestMatches,
  requestMatchesError,
  requestMatchesSuccess,
} from './lounge.actions';
import { APPLICATION_ERROR_MESSAGE } from '@root/app/shared/modules/application-error/translations';
import { NotificationService } from '@root/app/shared/services/notification.service';
import { LoungeService } from '@root/app/main/modules/lounge/services/lounge.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class LoungeEffects {

  requestLounge$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestMatches),
      mergeMap((action) => {
        return this.loungeService.getMatches(action.payload).pipe(
          switchMap(response => of(requestMatchesSuccess({response}))),
          catchError((error) => of(requestMatchesError({error}))),
        );
      }),
    ),
  );

  requestLoungeError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestMatchesError),
      tap(() => this.notificationService.error(APPLICATION_ERROR_MESSAGE)),
    ), {dispatch: false},
  );

  joinLounge$ = createEffect(() =>
    this.actions$.pipe(
      ofType(joinMatch),
      mergeMap((action) => {
        return this.loungeService.joinMatch(action.matchId).pipe(
          switchMap(matchPlayer => of(joinMatchSuccess({matchPlayer}))),
          catchError((error) => of(joinMatchError({error}))),
        );
      }),
    ),
  );

  joinMatchSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(joinMatchSuccess),
      tap((action) => this.router.navigate(['/matches', action.matchPlayer.matchId])),
    ), {dispatch: false},
  );

  joinLoungeError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestMatchesError),
      tap((action) => {
        let message = APPLICATION_ERROR_MESSAGE;
        if (action.error instanceof HttpErrorResponse) {
          if (action.error?.error.errorStatus === 'MATCH__CANNOT_JOIN_STARTED_MATCH') {
            message = 'This match has already started'
          }
        }

        this.notificationService.error(message);
      }),
    ), {dispatch: false},
  );


  constructor(
    private readonly actions$: Actions,
    private readonly loungeService: LoungeService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {
  }
}
