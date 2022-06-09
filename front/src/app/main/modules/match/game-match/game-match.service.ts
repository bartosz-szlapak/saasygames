import { Injectable } from '@angular/core';
import { WebsocketServiceFactory } from '@root/app/main/modules/match/game-match/websocket-service.factory';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { MatchStateInterface } from '@root/app/shared/modules/games/models/match-state.interface';
import { MakeMovePayload } from '@root/app/main/modules/match/models/make-move.payload';

@Injectable()
export class GameMatchService {

  private gameStateChangesSubject$ = new Subject<MatchStateInterface<any>>();
  readonly gameStateChanges$ = this.gameStateChangesSubject$.asObservable();
  private client: Socket;

  constructor(
    private websocketServiceFactory: WebsocketServiceFactory,
  ) {
  }

  joinMatch(matchId: string, jwt: string): void {
    this.client = this.websocketServiceFactory.create();
    this.client.connect();
    this.client.fromEvent('gameState')
      .subscribe((e: MatchStateInterface<any>) => {
        this.gameStateChangesSubject$.next(e);
      });
    this.client.emit('joinGame', {matchId, jwt});
  }

  makeMove(payload: MakeMovePayload): void {
    this.client.emit('makeMove', payload);
  }

}
