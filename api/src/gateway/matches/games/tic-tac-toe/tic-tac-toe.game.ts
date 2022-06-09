import { GameInterface } from '@app/gateway/matches/games/game.interface';
import { Injectable } from '@nestjs/common';
import { MatchPlayer } from '@app/entity/match-player.entity';
import { TicTacToeBoard } from '@app/gateway/matches/games/tic-tac-toe/tic-tac-toe-board';
import { MatchStateInterface } from '@app/gateway/matches/games/match-state.interface';
import { MatchStatusEnum } from '@app/shared/match-status/match-status.enum';
import { TicTacToePlayerMove } from '@app/gateway/matches/games/tic-tac-toe/tic-tac-toe-player-move';
import { TicTacToeAiProvider } from '@app/gateway/matches/games/tic-tac-toe/ai/tic-tac-toe-ai-provider';
import { EntityManager } from 'typeorm';
import { Match } from '@app/entity/match.entity';
import { MatchStatus } from '@app/entity/match-status.entity';

@Injectable()
export class TicTacToeGame implements GameInterface {

  constructor(
    private readonly ticTacToeAiProvider: TicTacToeAiProvider,
    private readonly entityManager: EntityManager,
  ) {
  }

  startGame(players: MatchPlayer[]): MatchStateInterface<TicTacToeBoard> {
    return {
      matchStatus: MatchStatusEnum.inProgress,
      winnerId: undefined,
      currentTurnPlayerId: this.getFirstPlayer(players).id,
      board: Array.from({length: 9}, (item, index) => {
        return {
          id: index,
          isMarkedAsWin: false,
          isOccupied: false,
          playerId: undefined
        };
      })
    };
  }

  private getFirstPlayer(players: MatchPlayer[]): MatchPlayer {
    return this.sortPlayers(players).slice().shift();
  }

  private sortPlayers(players: MatchPlayer[]): MatchPlayer[] {
    return players.sort((a, b) => {
      if (a.slot > b.slot) {
        return 1;
      }

      if (a.slot < b.slot) {
        return -1;
      }

      return 0;
    })
  }

  async makeAiMove(match: Match, matchState: MatchStateInterface<TicTacToeBoard>): Promise<MatchStateInterface<TicTacToeBoard>> {
    const currentAi = match.players.find(p => p.id === matchState.currentTurnPlayerId);
    const move = await this.ticTacToeAiProvider.getProvider(currentAi.difficultyId).createMove(matchState);

    return this.makeMove(match, matchState, matchState.currentTurnPlayerId, move);
  }

  private toggleNextPlayer(matchState: MatchStateInterface<TicTacToeBoard>, players: MatchPlayer[], currentPlayerId: string): MatchStateInterface<TicTacToeBoard> {
    return {
      ...matchState,
      currentTurnPlayerId: this.getNextPlayer(players, currentPlayerId).id,
    };
  }

  async makeMove(match: Match, matchState: MatchStateInterface<TicTacToeBoard>, playerId: string, move: TicTacToePlayerMove): Promise<MatchStateInterface<any>> {
    const newBoard = matchState.board.slice();
    const field = newBoard.find(field => field.id === move.fieldId)
    if (field.isOccupied) {
      throw new Error('Cannot take occupied field');
    }

    if (matchState.currentTurnPlayerId !== playerId) {
      throw new Error('Player is not allowed to make move')
    }

    field.isOccupied = true;
    field.playerId = playerId;
    const newState: MatchStateInterface<TicTacToeBoard> = {
      ...matchState,
      board: newBoard,
    };

    const winFields = this.getWinFields(newState, playerId);
    if (winFields) {
      await this.finishMatch(match, playerId);
      return this.updateWinState(newState, playerId, winFields);
    }

    if (this.isDraw(newState)) {
      await this.finishMatch(match);
      return this.updateDrawState(newState);
    }

    return {
      ...this.toggleNextPlayer(newState, match.players, playerId)
    }
  }

  private updateDrawState(matchState: MatchStateInterface<TicTacToeBoard>): MatchStateInterface<TicTacToeBoard> {
    return {
      ...matchState,
      matchStatus: MatchStatusEnum.finished,
    };
  }

  private async finishMatch(match: Match, winnerId?: string) {
    match.matchStatus = await this.entityManager.findOne(MatchStatus, MatchStatusEnum.finished);
    await this.entityManager.save(match);

    if (winnerId) {
      const player = match.players.find(p => p.id === winnerId);
      player.isWinner = true;
      await this.entityManager.save(player)
    }
  }

  private isDraw(matchState: MatchStateInterface<TicTacToeBoard>): boolean {
    return matchState.board.every(field => field.isOccupied);
  }

  private updateWinState(matchState: MatchStateInterface<TicTacToeBoard>, winnerId: string, fieldIds: number[]): MatchStateInterface<TicTacToeBoard> {
    return {
      ...matchState,
      winnerId,
      matchStatus: MatchStatusEnum.finished,
      board: matchState.board.slice()
        .map(field => {
          if (fieldIds.includes(field.id)) {
            field.isMarkedAsWin = true;
          }

          return field;
        })
    }
  }

  private getWinFields(matchState: MatchStateInterface<TicTacToeBoard>, playerId: string) {
    const winMatrix = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winMatrix.find(fieldIndexes => {
      return fieldIndexes.every(i => matchState.board.find(f => f.id === i).playerId === playerId)
    });
  }

  private getNextPlayer(players: MatchPlayer[], currentPlayerId: string): MatchPlayer {
    const sortedPlayers = this.sortPlayers(players);
    const index = sortedPlayers.findIndex(p => p.id === currentPlayerId);
    if (index === sortedPlayers.length - 1) {
      return sortedPlayers[0];
    }

    return sortedPlayers[index + 1];
  }
}
