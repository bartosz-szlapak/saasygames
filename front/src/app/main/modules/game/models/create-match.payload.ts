export interface CreateMatchPayload {
  gameId: number;
  players: { isAi: boolean; aiDifficulty: number }[];
}
