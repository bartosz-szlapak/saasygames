import { Action, createReducer, on } from '@ngrx/store';
import { requestMatch, requestMatchError, requestMatchSuccess, } from './match.actions';
import { Match } from '@root/app/shared/models/match';


export const STATE_NAME = 'match';

export interface State {
  match?: Match;
  matchLoading: boolean;
  matchError: boolean;
}

const initialState: State = {
  match: undefined,
  matchLoading: false,
  matchError: false,
};

const reducer = createReducer(
  initialState,
  on(requestMatch, (state) => ({
    ...state,
    match: undefined,
    matchLoading: true,
    matchError: false,
  })),
  on(requestMatchError, (state) => ({
    ...state,
    matchLoading: false,
    matchError: true,
  })),
  on(requestMatchSuccess, (state, action) => ({
    ...state,
    match: action.match,
    matchLoading: false,
  })),
);

export function matchReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
