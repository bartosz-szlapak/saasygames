import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { requestMatches } from '@root/app/main/modules/matches/store/matches.actions';

@Component({
  selector: 'app-my-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit, OnDestroy {
  userName: string;
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
      this.userName = params.userName;
      const limit = 20;
      const page = Number(params.page);
      const offset = page ? page * limit : 0;
      this.store.dispatch(requestMatches({
        payload: {
          limit,
          offset,
          userName: this.userName,
        },
      }));
    });
  }
}
