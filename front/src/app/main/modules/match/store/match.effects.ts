import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { requestMatch, requestMatchError, requestMatchSuccess, } from './match.actions';
import { APPLICATION_ERROR_MESSAGE } from '@root/app/shared/modules/application-error/translations';
import { NotificationService } from '@root/app/shared/services/notification.service';
import { MatchService } from '@root/app/main/modules/match/services/match.service';
import { Router } from '@angular/router';

@Injectable()
export class MatchEffects {

  requestMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestMatch),
      mergeMap((action) => {
        return this.matchService.getMatch(action.id).pipe(
          switchMap(match => of(requestMatchSuccess({match}))),
          catchError((error) => of(requestMatchError({error}))),
        );
      }),
    ),
  );

  requestMatchError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestMatchError),
      tap(() => this.notificationService.error(APPLICATION_ERROR_MESSAGE)),
    ), {dispatch: false},
  );

  constructor(
    private readonly actions$: Actions,
    private readonly matchService: MatchService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {
  }
}
