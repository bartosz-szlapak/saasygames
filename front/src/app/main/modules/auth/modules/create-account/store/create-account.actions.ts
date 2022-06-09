import { createAction, props } from '@ngrx/store';
import {
  CreateAccountByCredentialsPayload
} from '@root/app/main/modules/auth/modules/create-account/models/create-account-by-credentials-payload';

export const init = createAction('Create account / Init');
export const createAccount = createAction('Create account ', props<{ userData: CreateAccountByCredentialsPayload, returnUrl?: string }>());
export const createAccountSuccess = createAction('Create account success', props<{ returnUrl?: string }>());
export const createAccountError = createAction('Create account error', props<{ error: any }>());
