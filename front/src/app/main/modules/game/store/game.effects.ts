import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  createMatch,
  createMatchError,
  createMatchSuccess,
  requestGame,
  requestGameError,
  requestGameSuccess,
} from './game.actions';
import { APPLICATION_ERROR_MESSAGE } from '@root/app/shared/modules/application-error/translations';
import { NotificationService } from '@root/app/shared/services/notification.service';
import { GameService } from '@root/app/main/modules/game/services/game.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GameEffects {

  requestGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestGame),
      mergeMap((action) => {
        return this.gameService.getGame(action.id).pipe(
          switchMap(game => of(requestGameSuccess({game}))),
          catchError((error) => of(requestGameError({error}))),
        );
      }),
    ),
  );

  requestGameError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestGameError),
      tap(() => this.notificationService.error(APPLICATION_ERROR_MESSAGE)),
    ), {dispatch: false},
  );


  createMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMatch),
      mergeMap((action) => {
        return this.gameService.createMatch(action.payload).pipe(
          switchMap(match => of(createMatchSuccess({match}))),
          catchError((error) => of(createMatchError({error}))),
        );
      }),
    ),
  );

  createMatchError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMatchError),
      tap(action => {
        if (action.error instanceof HttpErrorResponse && action.error.error?.errorStatus === 'MATCH__CANNOT_CREATE_MULTIPLE_MATCHES') {
          this.notificationService.error('Cannot start new matches due to already ongoing matches');
          return;
        }

        this.notificationService.error(APPLICATION_ERROR_MESSAGE)
      }),
    ), {dispatch: false},
  );

  createMatchSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMatchSuccess),
      tap(action => {
        this.notificationService.success('Match created');
        this.router.navigate(['/matches', action.match.id]);
      }),
    ), {dispatch: false},
  );

  constructor(
    private readonly actions$: Actions,
    private readonly gameService: GameService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {
  }
}
