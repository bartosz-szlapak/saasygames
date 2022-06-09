import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectGamesError,
  selectGamesLoading,
  selectGamesResponse,
} from '@root/app/main/modules/games/store/games.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-games-body',
  templateUrl: './games-body.component.html',
  styleUrls: ['./games-body.component.scss'],
})
export class GamesBodyComponent {

  gamesResponse$ = this.store$.pipe(select(selectGamesResponse));
  gamesLoading$ = this.store$.pipe(select(selectGamesLoading));
  gamesError$ = this.store$.pipe(select(selectGamesError));

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
