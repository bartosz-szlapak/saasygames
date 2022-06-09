import { createAction, props } from '@ngrx/store';
import { DecodedJwt } from '@root/app/shared/utils/jwt/decoded-jwt';

export const logOut = createAction('Auth / Log out');
export const requestJwtRestoration = createAction('Auth / Request JWT restoration');
export const updateAccessToken = createAction('Auth / Update access token', props<{ accessToken: string }>());
export const updateDecodedAccessToken = createAction('Auth / Update decoded access token', props<{ decodedAccessToken: DecodedJwt }>());
export const updateRefreshToken = createAction('Auth / Update refresh token', props<{ refreshToken: string }>());
