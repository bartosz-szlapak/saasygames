import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Game } from '@root/app/shared/models/game';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DecodedJwt } from '@root/app/shared/utils/jwt/decoded-jwt';
import { Store } from '@ngrx/store';
import { DifficultyEnum } from '@root/app/shared/models/difficulty.enum';
import { createMatch } from '@root/app/main/modules/game/store/game.actions';
import { CreateMatchPayload } from '@root/app/main/modules/game/models/create-match.payload';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit, OnChanges {

  @Input() game: Game;
  @Input() jwt: DecodedJwt;
  playersForms: FormGroup[] = [];

  constructor(
    private store$: Store
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.playersForms = [];
    for (let i = 0; i < this.game.maxPlayers - 1; i++) {
      const formGroup = new FormGroup({
        isAi: new FormControl(true, Validators.required),
        aiDifficulty: new FormControl(DifficultyEnum.medium),
      });
      this.playersForms.push(formGroup);
    }

  }


  startGame() {
    this.playersForms.forEach(f => f.markAllAsTouched());
    const isAnyInvalid = this.playersForms.some(f => f.invalid);
    if (isAnyInvalid) {
      return;
    }

    const players = this.playersForms.map(f => f.value);
    const payload: CreateMatchPayload = {
      gameId: this.game.id,
      players
    };
    this.store$.dispatch(createMatch({payload}));
  }
}
