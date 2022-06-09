import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParamsHelper } from '@root/app/shared/utils/http-params-helper.service';
import { Match } from '@root/app/shared/models/match';
import { environment } from '@root/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchService {

  constructor(
    private readonly http: HttpClient,
    private readonly paramsHelper: HttpParamsHelper,
  ) {
  }

  getMatch(id: number): Observable<Match> {
    const url = `${ environment.apiUrl }/matches/${ id }`;

    return this.http.get<Match>(url);
  }
}
