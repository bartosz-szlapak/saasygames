import { Action, createReducer, on } from '@ngrx/store';
import { logOut, updateAccessToken, updateDecodedAccessToken, updateRefreshToken } from './jwt-state.actions';
import { DecodedJwt } from '@root/app/shared/utils/jwt/decoded-jwt';

export const STATE_NAME = 'root__jwt';

export interface JwtState {
  accessToken: string;
  refreshToken: string;
  decodedAccessToken: DecodedJwt;
  isAuthenticationFinished: boolean;
}

const initialState: JwtState = {
  accessToken: undefined,
  refreshToken: undefined,
  decodedAccessToken: undefined,
  isAuthenticationFinished: false,
};

const reducer = createReducer(
  initialState,
  on(updateAccessToken, (state, {accessToken}) => ({...state, accessToken, isAuthenticationFinished: true})),
  on(updateDecodedAccessToken, (state, {decodedAccessToken}) => ({...state, decodedAccessToken})),
  on(updateRefreshToken, (state, {refreshToken}) => ({...state, refreshToken})),
  on(logOut, () => ({...initialState})),
);

export function jwtStateReducer(state: JwtState | undefined, action: Action) {
  return reducer(state, action);
}
