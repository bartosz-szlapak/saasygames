import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectMatchesError,
  selectMatchesLoading,
  selectMatchesResponse,
} from '@root/app/main/modules/matches/store/matches.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-matches-body',
  templateUrl: './matches-body.component.html',
  styleUrls: ['./matches-body.component.scss'],
})
export class MatchesBodyComponent {
  @Input() userName: string;
  matchesResponse$ = this.store$.pipe(select(selectMatchesResponse));
  matchesLoading$ = this.store$.pipe(select(selectMatchesLoading));
  matchesError$ = this.store$.pipe(select(selectMatchesError));

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
