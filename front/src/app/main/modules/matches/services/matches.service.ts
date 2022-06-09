import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParamsHelper } from '@root/app/shared/utils/http-params-helper.service';
import { RequestMatchesPayload } from '@root/app/main/modules/matches/models/request-matches.payload';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { Match } from '@root/app/shared/models/match';
import { environment } from '@root/environments/environment';
import { MatchStatusEnum } from '@root/app/shared/models/match-status.enum';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {

  constructor(
    private readonly http: HttpClient,
    private readonly paramsHelper: HttpParamsHelper,
  ) {
  }

  getMatches(payload: RequestMatchesPayload): Observable<PageableResponse<Match>> {
    const url = `${ environment.apiUrl }/matches`;
    const params = this.paramsHelper.objectToHttpParams({
      ...payload,
      matchStatusId: [MatchStatusEnum.inProgress]
    });

    return this.http.get<PageableResponse<Match>>(url, {params});
  }
}
