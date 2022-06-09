import { createAction, props } from '@ngrx/store';
import { LoginResponse } from '@root/app/main/modules/auth/modules/login/models/login-response';
import {
  LoginByCredentialsPayload
} from '@root/app/main/modules/auth/modules/login/models/login-by-credentials.payload';

export const init = createAction('Login by credentials init');
export const loginByCredentials = createAction('Login by credentials requested', props<{ payload: LoginByCredentialsPayload }>());
export const loginByCredentialsSuccess = createAction('Login by credentials success', props<{ response: LoginResponse, returnUrl?: string }>());
export const loginByCredentialsFailed = createAction('Login by credentials failed', props<{ error: string }>());
