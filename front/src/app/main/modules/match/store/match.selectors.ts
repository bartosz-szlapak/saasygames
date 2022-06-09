import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, STATE_NAME } from './match.reducer';

const currentState = createFeatureSelector<State>(STATE_NAME);

export const selectMatch = createSelector(
  currentState,
  (state: State) => state.match,
);

export const selectMatchLoading = createSelector(
  currentState,
  (state: State) => state.matchLoading,
);

export const selectMatchError = createSelector(
  currentState,
  (state: State) => state.matchError,
);
