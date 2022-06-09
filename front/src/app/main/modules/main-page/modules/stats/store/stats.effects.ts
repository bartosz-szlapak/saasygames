import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  requestPlatformStats,
  requestPlatformStatsError,
  requestPlatformStatsSuccess,
  requestUserStats,
  requestUserStatsError,
  requestUserStatsSuccess,
} from './stats.actions';
import { APPLICATION_ERROR_MESSAGE } from '@root/app/shared/modules/application-error/translations';
import { NotificationService } from '@root/app/shared/services/notification.service';
import { StatsService } from '@root/app/main/modules/main-page/modules/stats/services/stats.service';

@Injectable()
export class StatsEffects {

  requestPlatformStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestPlatformStats),
      mergeMap((action) => {
        return this.statsService.getPlatformStats().pipe(
          switchMap(platformStats => of(requestPlatformStatsSuccess({platformStats}))),
          catchError((error) => of(requestPlatformStatsError({error}))),
        );
      }),
    ),
  );

  requestPlatformStatsError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestPlatformStatsError),
      tap(() => this.notificationService.error(APPLICATION_ERROR_MESSAGE)),
    ), {dispatch: false},
  );

  requestUserStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestUserStats),
      mergeMap((action) => {
        return this.statsService.getUserStats().pipe(
          switchMap(userStats => of(requestUserStatsSuccess({userStats}))),
          catchError((error) => of(requestUserStatsError({error}))),
        );
      }),
    ),
  );

  requestUserStatsError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestUserStatsError),
      tap(() => this.notificationService.error(APPLICATION_ERROR_MESSAGE)),
    ), {dispatch: false},
  );

  constructor(
    private readonly actions$: Actions,
    private readonly statsService: StatsService,
    private readonly notificationService: NotificationService,
  ) {
  }
}
