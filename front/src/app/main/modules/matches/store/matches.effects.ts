import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { requestMatches, requestMatchesError, requestMatchesSuccess, } from './matches.actions';
import { APPLICATION_ERROR_MESSAGE } from '@root/app/shared/modules/application-error/translations';
import { NotificationService } from '@root/app/shared/services/notification.service';
import { MatchesService } from '@root/app/main/modules/matches/services/matches.service';

@Injectable()
export class MatchesEffects {

  requestMatches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestMatches),
      mergeMap((action) => {
        return this.matcheservice.getMatches(action.payload).pipe(
          switchMap(response => of(requestMatchesSuccess({response}))),
          catchError((error) => of(requestMatchesError({error}))),
        );
      }),
    ),
  );

  requestMatchesError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestMatchesError),
      tap(() => this.notificationService.error(APPLICATION_ERROR_MESSAGE)),
    ), {dispatch: false},
  );

  constructor(
    private readonly actions$: Actions,
    private readonly matcheservice: MatchesService,
    private readonly notificationService: NotificationService,
  ) {
  }
}
