import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JwtState, STATE_NAME } from './jwt-state.reducer';
import { RoleEnum } from '@root/app/shared/models/role.enum';

const currentState = createFeatureSelector<JwtState>(STATE_NAME);


export const selectIsAuthenticated = createSelector(
  currentState,
  (state: JwtState) => !!state.accessToken,
);

export const selectAccessToken = createSelector(
  currentState,
  (state: JwtState) => state.accessToken,
);

export const selectDecodedAccessToken = createSelector(
  currentState,
  (state: JwtState) => state.decodedAccessToken,
);

export const selectUserId = createSelector(
  currentState,
  (state: JwtState) => state.decodedAccessToken?.userId,
);

export const selectUserRoleId = createSelector(
  currentState,
  (state: JwtState) => state.decodedAccessToken?.roleId,
);

export const selectIsAuthenticationFinished = createSelector(
  currentState,
  (state: JwtState) => state.isAuthenticationFinished,
);

export const selectHasAdministratorRole = createSelector(
  currentState,
  (state: JwtState) => state.decodedAccessToken?.roleId === RoleEnum.administrator,
);
