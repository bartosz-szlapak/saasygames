import { Action, createReducer, on } from '@ngrx/store';
import {
  banUser,
  banUserError,
  banUserSuccess,
  requestUser,
  requestUserError,
  requestUserSuccess,
} from '@root/app/main/modules/user/store/user.actions';
import { User } from '@root/app/shared/models/user';


export const STATE_NAME = 'user';

export interface State {
  user?: User;
  userLoading: boolean;
  userError: boolean;
  userSaving: boolean;
}

const initialState: State = {
  userLoading: false,
  userError: false,
  userSaving: false,
};

const reducer = createReducer(
  initialState,
  on(requestUser, (state) => ({
    ...state,
    user: undefined,
    userLoading: true,
    userError: false,
  })),
  on(requestUserError, (state) => ({
    ...state,
    userLoading: false,
    userError: true,
  })),
  on(requestUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    userLoading: false,
  })),

  on(banUser, (state) => ({
    ...state,
    userSaving: true,
  })),
  on(banUserError, (state) => ({
    ...state,
    userSaving: false,
  })),
  on(banUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    userLoading: false,
  })),
);

export function userReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
