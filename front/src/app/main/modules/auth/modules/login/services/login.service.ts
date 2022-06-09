import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment';

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  loginByCredentials(userName: string, password: string): Observable<LoginResponse> {
    const url = `${ environment.apiUrl }/auth/token`;
    const params = {
      userName,
      password,
    };

    return this.httpClient.post<LoginResponse>(url, params);
  }
}
