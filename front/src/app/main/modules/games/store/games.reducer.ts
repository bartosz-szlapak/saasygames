import { Action, createReducer, on } from '@ngrx/store';
import { requestGames, requestGamesError, requestGamesSuccess, } from './games.actions';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { Game } from '@root/app/shared/models/game';


export const STATE_NAME = 'games';

export interface State {
  gamesResponse?: PageableResponse<Game>;
  gamesResponseLoading: boolean;
  gamesResponseError: boolean;
}

const initialState: State = {
  gamesResponse: undefined,
  gamesResponseLoading: false,
  gamesResponseError: false,
};

const reducer = createReducer(
  initialState,
  on(requestGames, (state) => ({
    ...state,
    gamesResponse: undefined,
    gamesResponseLoading: true,
    gamesResponseError: false,
  })),
  on(requestGamesError, (state) => ({
    ...state,
    gamesResponseLoading: false,
    gamesResponseError: true,
  })),
  on(requestGamesSuccess, (state, action) => ({
    ...state,
    gamesResponse: action.response,
    gamesResponseLoading: false,
  })),
);

export function gamesReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
