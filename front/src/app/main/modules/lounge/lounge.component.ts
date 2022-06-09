import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { requestMatches } from '@root/app/main/modules/lounge/store/lounge.actions';

@Component({
  selector: 'app-my-lounge',
  templateUrl: './lounge.component.html',
  styleUrls: ['./lounge.component.scss'],
})
export class LoungeComponent implements OnInit, OnDestroy {

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
      this.store.dispatch(requestMatches({
        payload: {
          limit,
          offset,
        },
      }));
    });
  }
}
