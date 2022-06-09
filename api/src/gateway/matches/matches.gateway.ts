import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnGatewayConnection } from '@nestjs/websockets/interfaces';
import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import { MatchService } from '@app/gateway/matches/services/match.service';
import { JoinGamePayload } from '@app/gateway/matches/models/messages/join-game.payload';
import { MatchEventEnum } from '@app/gateway/matches/models/match-event.enum';
import { MakeMovePayload } from '@app/gateway/matches/models/messages/make-move.payload';
import { MatchStatusEnum } from '@app/shared/match-status/match-status.enum';
import { SpectateGamePayload } from '@app/gateway/matches/models/messages/spectate-game.payload';

@WebSocketGateway(3006, {cors: {origin: '*'}})
export class MatchesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;


  constructor(
    private readonly matchService: MatchService,
  ) {
  }


  @SubscribeMessage('joinGame')
  async joinGame(@MessageBody() data: JoinGamePayload): Promise<void> {
    // todo być może match powinien zawierac dane o grze i uczestnikach
    //  gdy user dolaczy a inny oglaad to nie bedzie informacji :(


    this.server.socketsJoin(data.matchId);
    const matchState = await this.matchService.joinMatch(data);
    if (!matchState) {
      return;
    }

    this.sendEvent(data.matchId, MatchEventEnum.gameState, matchState);
  }

  @SubscribeMessage('spectateGame')
  async spectateGame(@MessageBody() data: SpectateGamePayload): Promise<void> {
    this.server.socketsJoin(data.matchId);
    const matchState = await this.matchService.getMatchState(data.matchId);
    if (!matchState) {
      return;
    }

    this.sendEvent(data.matchId, MatchEventEnum.gameState, matchState);
  }

  @SubscribeMessage('makeMove')
  async makeMove(@MessageBody() data: MakeMovePayload): Promise<void> {
    let matchState = await this.matchService.makeMove(data);
    this.sendEvent(data.matchId, MatchEventEnum.gameState, matchState);

    while (await this.matchService.isAiTurn(data.matchId) && matchState.matchStatus === MatchStatusEnum.inProgress) {
      matchState = await this.matchService.makeAiMove(matchState, data.matchId);
      this.sendEvent(data.matchId, MatchEventEnum.gameState, matchState);
    }
  }

  handleConnection(client: Socket): any {

    return JSON.stringify({ok: 1});
  }

  handleDisconnect(client: any): any {
  }


  private sendEvent(matchId: string, event: MatchEventEnum, data: any): void {
    this.server.to(matchId).emit(event, data);
  }

}
