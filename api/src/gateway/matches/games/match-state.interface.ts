import { MatchStatusEnum } from '@app/shared/match-status/match-status.enum';


export interface MatchStateInterface<B extends any> {
  matchStatus: MatchStatusEnum;
  winnerId: string;
  currentTurnPlayerId: string;
  board: B;
}
