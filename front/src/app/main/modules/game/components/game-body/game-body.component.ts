import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectGame, selectGameError, selectGameLoading, } from '@root/app/main/modules/game/store/game.selectors';
import { ActivatedRoute } from '@angular/router';
import { selectDecodedAccessToken } from '@root/app/core/modules/jwt-state/store/jwt-state.selectors';

@Component({
  selector: 'app-game-body',
  templateUrl: './game-body.component.html',
  styleUrls: ['./game-body.component.scss'],
})
export class GameBodyComponent {

  game$ = this.store$.pipe(select(selectGame));
  gameLoading$ = this.store$.pipe(select(selectGameLoading));
  gameError$ = this.store$.pipe(select(selectGameError));
  jwt$ = this.store$.pipe(select(selectDecodedAccessToken));

  constructor(
    private readonly store$: Store,
    public readonly activatedRoute: ActivatedRoute,
  ) {
  }
}
