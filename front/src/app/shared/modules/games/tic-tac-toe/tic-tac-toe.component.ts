import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  TicTacToeBoard,
  TicTacToeBoardField
} from '@root/app/shared/modules/games/tic-tac-toe/models/tic-tac-toe-board';
import { MatchStateInterface } from '@root/app/shared/modules/games/models/match-state.interface';
import { Match } from '@root/app/shared/models/match';
import { TicTacToePlayerMove } from '@root/app/shared/modules/games/tic-tac-toe/models/tic-tac-toe-player-move';
import { MatchStatusEnum } from '@root/app/shared/models/match-status.enum';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit, OnChanges {

  @Input() match: Match;
  @Input() userId: string;
  @Input() playerId: string;
  @Input() state: MatchStateInterface<TicTacToeBoard>;
  @Output() move = new EventEmitter<TicTacToePlayerMove>();
  playersTurn: string;
  matchStatusEnum = MatchStatusEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

  get isSpectator() {
    if (!this.userId || !this.playerId || !this.state || !this.match) {
      return true;
    }

    return this.state.currentTurnPlayerId !== this.playerId
  }

  get winnerName() {
    if (this.state) {
      return this.match.players.find(p => p.id === this.state.winnerId)?.playerName;
    }

    return this.match.players.find(p => p.isWinner)?.playerName;
  }

  get matchStatusId() {
    return this.state ? this.state.matchStatus : this.match.matchStatusId
  }

  getBoardPlayerSymbol(playerId: string) {
    return this.match.players.find(p => p.slot === 1 && p.id === playerId) ? 'close' : 'circle';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.playersTurn = this.match?.players.find(p => p.id === this.state?.currentTurnPlayerId)?.playerName;
  }


  makeMove(field: TicTacToeBoardField): void {
    this.move.emit({fieldId: field.id});
  }
}
