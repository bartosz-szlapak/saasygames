export interface CreateMatchPayload {
  matchId: number;
  players: { isAi: boolean; aiDifficulty: number }[];
}
