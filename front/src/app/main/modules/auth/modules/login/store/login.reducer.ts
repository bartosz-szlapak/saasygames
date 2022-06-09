import { Action, createReducer, on } from '@ngrx/store';
import { init, loginByCredentials, loginByCredentialsFailed, } from './login.actions';

export const STATE_NAME = 'auth__login';

export interface State {
  loginByCredentialsLoading: boolean;
}

const initialState: State = {
  loginByCredentialsLoading: false,
};

const reducer = createReducer(
  initialState,
  on(init, () => ({
    ...initialState,
  })),

  on(loginByCredentials, (state) => ({
    ...state,
    loginByCredentialsLoading: true,
  })),
  on(loginByCredentialsFailed, (state) => ({
    ...state,
    loginByCredentialsLoading: false,
  })),
);

export function loginReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
