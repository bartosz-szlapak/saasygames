import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefreshTokenResponse } from '../models/refresh-token-response';
import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment';

@Injectable({providedIn: 'root'})
export class JwtService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  refreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    const url = `${ environment.apiUrl }/auth/refresh-token`;
    const params = {refreshToken};

    return this.httpClient.post<RefreshTokenResponse>(url, params);
  }
}

