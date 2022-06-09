import { createAction, props } from '@ngrx/store';
import { GetUsersPayload } from '@root/app/shared/user/get-users.payload';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { User } from '@root/app/shared/models/user';

export const requestUsers = createAction(`users / Request users`, props<{ payload: GetUsersPayload }>());
export const requestUsersSuccess = createAction(`users / Request users success`, props<{ response: PageableResponse<User> }>());
export const requestUsersError = createAction(`users / Request users error`, props<{ error: any }>());
