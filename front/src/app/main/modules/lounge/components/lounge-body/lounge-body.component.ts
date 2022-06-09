import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectMatchesError,
  selectMatchesLoading,
  selectMatchesResponse,
} from '@root/app/main/modules/lounge/store/lounge.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { selectDecodedAccessToken } from '@root/app/core/modules/jwt-state/store/jwt-state.selectors';

@Component({
  selector: 'app-lounge-body',
  templateUrl: './lounge-body.component.html',
  styleUrls: ['./lounge-body.component.scss'],
})
export class LoungeBodyComponent {

  loungeResponse$ = this.store$.pipe(select(selectMatchesResponse));
  loungeLoading$ = this.store$.pipe(select(selectMatchesLoading));
  loungeError$ = this.store$.pipe(select(selectMatchesError));
  jwt$ = this.store$.pipe(select(selectDecodedAccessToken));

  constructor(
    private readonly store$: Store,
    public readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  onPageChange(page: number): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {page},
      relativeTo: this.activatedRoute,
    });
  }
}
