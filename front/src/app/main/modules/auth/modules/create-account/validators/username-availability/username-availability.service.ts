import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@root/environments/environment';

@Injectable({providedIn: 'root'})
export class UsernameAvailabilityService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getUsernameAvailability(userName: string): Observable<{ isAvailable: boolean }> {
    const url = `${ environment.apiUrl }/users/username-availability`;
    const params = {userName};

    return this.httpClient.get<{ isAvailable: boolean }>(url, {params});
  }

}
