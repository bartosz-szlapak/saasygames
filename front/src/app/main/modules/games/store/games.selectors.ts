import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, STATE_NAME } from './games.reducer';

const currentState = createFeatureSelector<State>(STATE_NAME);

export const selectGamesResponse = createSelector(
  currentState,
  (state: State) => state.gamesResponse,
);

export const selectGamesLoading = createSelector(
  currentState,
  (state: State) => state.gamesResponseLoading,
);

export const selectGamesError = createSelector(
  currentState,
  (state: State) => state.gamesResponseError,
);
