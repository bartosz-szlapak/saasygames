import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateAccountResponse
} from '@root/app/main/modules/auth/modules/create-account/models/create-account.response';
import {
  CreateAccountByCredentialsPayload
} from '@root/app/main/modules/auth/modules/create-account/models/create-account-by-credentials-payload';
import { environment } from '@root/environments/environment';

@Injectable({providedIn: 'root'})
export class RegistrationService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  createAccountByCredentials(payload: CreateAccountByCredentialsPayload): Observable<CreateAccountResponse> {
    const url = `${ environment.apiUrl }/users/registration/credentials`;

    return this.httpClient.post<CreateAccountResponse>(url, payload);
  }
}
