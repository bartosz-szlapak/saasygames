import { Action, createReducer, on } from '@ngrx/store';
import { createAccount, createAccountError, init, } from './create-account.actions';

export const STATE_NAME = 'auth__create-account';

export interface State {
  userSaving: boolean;
}

const initialState: State = {
  userSaving: false,
};

const reducer = createReducer(
  initialState,

  on(init, () => ({
    ...initialState,
  })),

  on(createAccount, (state) => ({
    ...state,
    userSaving: true,
  })),
  on(createAccountError, (state) => ({
    ...state,
    userSaving: false,
  })),
);

export function createAccountReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
