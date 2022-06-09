import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@root/environments/environment';
import { PlatformStats } from '@root/app/main/modules/main-page/modules/stats/models/platform-stats';
import { UserStats } from '@root/app/main/modules/main-page/modules/stats/models/user-stats';

@Injectable({
  providedIn: 'root',
})
export class StatsService {

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  getPlatformStats(): Observable<PlatformStats> {
    const url = `${ environment.apiUrl }/stats/platform`;

    return this.http.get<PlatformStats>(url);
  }

  getUserStats(): Observable<UserStats> {
    const url = `${ environment.apiUrl }/stats/user`;

    return this.http.get<UserStats>(url);
  }
}
