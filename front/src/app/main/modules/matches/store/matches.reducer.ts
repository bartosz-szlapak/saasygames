import { Action, createReducer, on } from '@ngrx/store';
import { requestMatches, requestMatchesError, requestMatchesSuccess, } from './matches.actions';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { Match } from '@root/app/shared/models/match';


export const STATE_NAME = 'matches';

export interface State {
  matchesResponse?: PageableResponse<Match>;
  matchesResponseLoading: boolean;
  matchesResponseError: boolean;
}

const initialState: State = {
  matchesResponse: undefined,
  matchesResponseLoading: false,
  matchesResponseError: false,
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
);

export function matchesReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
