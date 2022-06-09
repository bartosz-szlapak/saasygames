import { Action, createReducer, on } from '@ngrx/store';
import { requestGame, requestGameError, requestGameSuccess, } from './game.actions';
import { Game } from '@root/app/shared/models/game';


export const STATE_NAME = 'game';

export interface State {
  game?: Game;
  gameLoading: boolean;
  gameError: boolean;
}

const initialState: State = {
  game: undefined,
  gameLoading: false,
  gameError: false,
};

const reducer = createReducer(
  initialState,
  on(requestGame, (state) => ({
    ...state,
    game: undefined,
    gameLoading: true,
    gameError: false,
  })),
  on(requestGameError, (state) => ({
    ...state,
    gameLoading: false,
    gameError: true,
  })),
  on(requestGameSuccess, (state, action) => ({
    ...state,
    game: action.game,
    gameLoading: false,
  })),
);

export function gameReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
