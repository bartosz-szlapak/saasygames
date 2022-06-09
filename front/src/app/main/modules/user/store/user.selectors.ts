import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, STATE_NAME } from './user.reducer';

const currentState = createFeatureSelector<State>(STATE_NAME);

export const selectUser = createSelector(
  currentState,
  (state: State) => state.user,
);

export const selectIsLoading = createSelector(
  currentState,
  (state: State) => state.userLoading,
);

export const selectIsError = createSelector(
  currentState,
  (state: State) => state.userError,
);

export const selectUserSaving = createSelector(
  currentState,
  (state: State) => state.userSaving,
);
