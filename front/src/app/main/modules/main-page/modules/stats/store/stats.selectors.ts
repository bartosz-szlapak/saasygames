import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, STATE_NAME } from './stats.reducer';

const currentState = createFeatureSelector<State>(STATE_NAME);

export const selectPlatformStats = createSelector(
  currentState,
  (state: State) => state.platformStats,
);


export const selectUserStats = createSelector(
  currentState,
  (state: State) => state.userStats,
);

