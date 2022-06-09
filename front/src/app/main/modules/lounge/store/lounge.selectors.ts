import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, STATE_NAME } from './lounge.reducer';

const currentState = createFeatureSelector<State>(STATE_NAME);

export const selectMatchesResponse = createSelector(
  currentState,
  (state: State) => state.matchesResponse,
);

export const selectMatchesLoading = createSelector(
  currentState,
  (state: State) => state.matchesResponseLoading,
);

export const selectMatchesError = createSelector(
  currentState,
  (state: State) => state.matchesResponseError,
);
