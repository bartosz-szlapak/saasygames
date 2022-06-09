import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
  requestPlatformStats,
  requestUserStats
} from '@root/app/main/modules/main-page/modules/stats/store/stats.actions';
import { selectIsAuthenticated } from '@root/app/core/modules/jwt-state/store/jwt-state.selectors';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {

  isAuthenticated$ = this.store$.pipe(select(selectIsAuthenticated));
  private unsubscribe$ = new Subject<void>();

  constructor(
    private readonly store$: Store,
  ) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.store$.dispatch(requestPlatformStats());

    this.isAuthenticated$.pipe(
      filter(isAuthenticated => isAuthenticated),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => this.store$.dispatch(requestUserStats()))
  }
}
