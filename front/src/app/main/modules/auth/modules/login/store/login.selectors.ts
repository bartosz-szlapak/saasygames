import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, STATE_NAME } from './login.reducer';

const currentState = createFeatureSelector<State>(STATE_NAME);

export const selectLoginByCredentialsLoading = createSelector(
  currentState,
  (state: State) => state.loginByCredentialsLoading,
);
