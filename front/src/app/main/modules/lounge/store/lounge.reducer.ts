import { Action, createReducer, on } from '@ngrx/store';
import {
  joinMatch,
  joinMatchError,
  joinMatchSuccess,
  requestMatches,
  requestMatchesError,
  requestMatchesSuccess,
} from './lounge.actions';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { Match } from '@root/app/shared/models/match';


export const STATE_NAME = 'lounge';

export interface State {
  matchesResponse?: PageableResponse<Match>;
  matchesResponseLoading: boolean;
  matchesResponseError: boolean;

  joinedMatchPlayerLoading: boolean;
}

const initialState: State = {
  matchesResponse: undefined,
  matchesResponseLoading: false,
  matchesResponseError: false,

  joinedMatchPlayerLoading: false,
};

const reducer = createReducer(
  initialState,
  on(requestMatches, (state) => ({
    ...state,
    matchesResponse: undefined,
    matchesResponseLoading: true,
    matchesResponseError: false,
  })),
  on(requestMatchesError, (state) => ({
    ...state,
    matchesResponseLoading: false,
    matchesResponseError: true,
  })),
  on(requestMatchesSuccess, (state, action) => ({
    ...state,
    matchesResponse: action.response,
    matchesResponseLoading: false,
  })),

  on(joinMatch, (state) => ({
    ...state,
    joinedMatchPlayerLoading: true,
  })),
  on(joinMatchError, (state) => ({
    ...state,
    joinedMatchPlayerLoading: false,
  })),
  on(joinMatchSuccess, (state) => ({
    ...state,
    joinedMatchPlayerLoading: false,
  })),
);

export function loungeReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
