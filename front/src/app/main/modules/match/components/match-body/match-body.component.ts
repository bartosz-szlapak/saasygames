import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectMatch, selectMatchError, selectMatchLoading, } from '@root/app/main/modules/match/store/match.selectors';
import { ActivatedRoute } from '@angular/router';
import {
  selectAccessToken,
  selectDecodedAccessToken
} from '@root/app/core/modules/jwt-state/store/jwt-state.selectors';

@Component({
  selector: 'app-match-body',
  templateUrl: './match-body.component.html',
  styleUrls: ['./match-body.component.scss'],
})
export class MatchBodyComponent {

  match$ = this.store$.pipe(select(selectMatch));
  matchLoading$ = this.store$.pipe(select(selectMatchLoading));
  matchError$ = this.store$.pipe(select(selectMatchError));
  jwt$ = this.store$.pipe(select(selectAccessToken));
  decodedJwt$ = this.store$.pipe(select(selectDecodedAccessToken));

  constructor(
    private readonly store$: Store,
    public readonly activatedRoute: ActivatedRoute,
  ) {
  }
}
