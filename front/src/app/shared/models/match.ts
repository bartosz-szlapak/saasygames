import { MatchPlayer } from '@root/app/shared/models/match-player';
import { Game } from '@root/app/shared/models/game';

export class Match {
  id: string;
  gameId: number;
  matchStatusId: number;
  createdAt: string;
  players: MatchPlayer[];
  winnerId: number;
  game: Game;
}
