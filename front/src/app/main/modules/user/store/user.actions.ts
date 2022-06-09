import { createAction, props } from '@ngrx/store';
import { User } from '@root/app/shared/models/user';

export const requestUser = createAction(`user / Request user`, props<{ id: number }>());
export const requestUserSuccess = createAction(`user / Request user success`, props<{ user: User }>());
export const requestUserError = createAction(`user / Request user error`, props<{ error: any }>());

export const banUser = createAction(`user / Ban user`, props<{ id: number }>());
export const banUserSuccess = createAction(`user / Ban user success`, props<{ user: User }>());
export const banUserError = createAction(`user / Ban user error`, props<{ error: any }>());
