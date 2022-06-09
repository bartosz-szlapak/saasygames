import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, STATE_NAME } from './game.reducer';

const currentState = createFeatureSelector<State>(STATE_NAME);

export const selectGame = createSelector(
  currentState,
  (state: State) => state.game,
);

export const selectGameLoading = createSelector(
  currentState,
  (state: State) => state.gameLoading,
);

export const selectGameError = createSelector(
  currentState,
  (state: State) => state.gameError,
);
