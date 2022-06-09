import { Action, createReducer, on } from '@ngrx/store';
import { requestUsers, requestUsersError, requestUsersSuccess, } from './users.actions';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { User } from '@root/app/shared/models/user';


export const STATE_NAME = 'users';

export interface State {
  usersResponse?: PageableResponse<User>;
  usersLoading: boolean;
  usersError: boolean;
}

const initialState: State = {
  usersLoading: false,
  usersError: false,
};

const reducer = createReducer(
  initialState,
  on(requestUsers, (state) => ({
    ...state,
    usersResponse: undefined,
    usersLoading: true,
    usersError: false,
  })),
  on(requestUsersError, (state) => ({
    ...state,
    usersLoading: false,
    usersError: true,
  })),
  on(requestUsersSuccess, (state, action) => ({
    ...state,
    usersResponse: action.response,
    usersLoading: false,
  })),
);

export function usersReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
