import { MatchStatusEnum } from '@root/app/shared/models/match-status.enum';

export interface MatchStateInterface<B extends any> {
  matchStatus: MatchStatusEnum;
  winnerId: string;
  currentTurnPlayerId: string;
  board: B;
}
