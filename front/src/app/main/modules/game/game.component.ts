import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { requestGame } from '@root/app/main/modules/game/store/game.actions';

@Component({
  selector: 'app-my-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  constructor(
    private readonly store$: Store,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.gameId;
    this.store$.dispatch(requestGame({id}));
  }
}
