import { MatchPlayer } from '@app/entity/match-player.entity';
import { MatchStateInterface } from '@app/gateway/matches/games/match-state.interface';
import { Match } from '@app/entity/match.entity';

export interface GameInterface {
  startGame(players: MatchPlayer[]): MatchStateInterface<any>;

  makeMove(match: Match, matchState: MatchStateInterface<any>, playerId: string, move: any): Promise<MatchStateInterface<any>>;

  makeAiMove(match: Match, matchState: MatchStateInterface<any>): Promise<MatchStateInterface<any>>;
}
