import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParamsHelper } from '@root/app/shared/utils/http-params-helper.service';
import { RequestMatchesPayload } from '@root/app/main/modules/lounge/models/request-matches.payload';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { Match } from '@root/app/shared/models/match';
import { environment } from '@root/environments/environment';
import { MatchStatusEnum } from '@root/app/shared/models/match-status.enum';
import { MatchPlayer } from '@root/app/shared/models/match-player';

@Injectable({
  providedIn: 'root',
})
export class LoungeService {

  constructor(
    private readonly http: HttpClient,
    private readonly paramsHelper: HttpParamsHelper,
  ) {
  }

  getMatches(payload: RequestMatchesPayload): Observable<PageableResponse<Match>> {
    const url = `${ environment.apiUrl }/matches`;
    const params = this.paramsHelper.objectToHttpParams({
      ...payload,
      matchStatusId: [MatchStatusEnum.pending]
    });

    return this.http.get<PageableResponse<Match>>(url, {params});
  }

  joinMatch(matchId: string): Observable<MatchPlayer> {
    const url = `${ environment.apiUrl }/matches/${ matchId }/join`;

    return this.http.post<MatchPlayer>(url, {});
  }
}
