import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, STATE_NAME } from './create-account.reducer';

const currentState = createFeatureSelector<State>(STATE_NAME);


export const selectIsSaving = createSelector(
  currentState,
  (state: State) => state.userSaving,
);
