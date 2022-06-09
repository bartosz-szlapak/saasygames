import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { requestGames } from '@root/app/main/modules/games/store/games.actions';

@Component({
  selector: 'app-my-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(params => {
      const limit = 20;
      const page = Number(params.page);
      const offset = page ? page * limit : 0;
      this.store.dispatch(requestGames({
        payload: {
          limit,
          offset,
        },
      }));
    });
  }
}
