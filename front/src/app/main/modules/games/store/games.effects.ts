import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { requestGames, requestGamesError, requestGamesSuccess, } from './games.actions';
import { APPLICATION_ERROR_MESSAGE } from '@root/app/shared/modules/application-error/translations';
import { NotificationService } from '@root/app/shared/services/notification.service';
import { GamesService } from '@root/app/main/modules/games/services/games.service';

@Injectable()
export class GamesEffects {

  requestGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestGames),
      mergeMap((action) => {
        return this.gameService.getGames(action.payload).pipe(
          switchMap(response => of(requestGamesSuccess({response}))),
          catchError((error) => of(requestGamesError({error}))),
        );
      }),
    ),
  );

  requestGamesError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestGamesError),
      tap(() => this.notificationService.error(APPLICATION_ERROR_MESSAGE)),
    ), {dispatch: false},
  );

  constructor(
    private readonly actions$: Actions,
    private readonly gameService: GamesService,
    private readonly notificationService: NotificationService,
  ) {
  }
}
