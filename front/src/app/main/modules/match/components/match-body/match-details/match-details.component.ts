import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Match } from '@root/app/shared/models/match';
import { Store } from '@ngrx/store';
import { GameMatchService } from '@root/app/main/modules/match/game-match/game-match.service';
import { DecodedJwt } from '@root/app/shared/utils/jwt/decoded-jwt';
import { Observable } from 'rxjs';
import { MatchStateInterface } from '@root/app/shared/modules/games/models/match-state.interface';
import { TicTacToePlayerMove } from '@root/app/shared/modules/games/tic-tac-toe/models/tic-tac-toe-player-move';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent implements OnInit, OnChanges {

  @Input() match: Match;
  @Input() jwt: string;
  @Input() decodedJwt: DecodedJwt;
  gameState$: Observable<MatchStateInterface<any>>;
  playerId: string;

  constructor(
    private readonly store$: Store,
    private readonly gameMatchService: GameMatchService
  ) {
  }

  ngOnInit(): void {
    this.gameState$ = this.gameMatchService.gameStateChanges$;
    this.gameMatchService.joinMatch(this.match.id, this.jwt);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.playerId = this.match?.players.find(p => p.userId === this.decodedJwt?.userId)?.id;
  }


  moved(playerMove: TicTacToePlayerMove): void {
    this.gameMatchService.makeMove({
      matchId: this.match.id,
      playerId: this.playerId,
      playerMove
    });
  }
}
