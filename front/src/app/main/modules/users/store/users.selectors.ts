import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, STATE_NAME } from './users.reducer';

const currentState = createFeatureSelector<State>(STATE_NAME);

export const selectUsersResponse = createSelector(
  currentState,
  (state: State) => state.usersResponse,
);

export const selectUsersLoading = createSelector(
  currentState,
  (state: State) => state.usersLoading,
);

export const selectUsersError = createSelector(
  currentState,
  (state: State) => state.usersError,
);
