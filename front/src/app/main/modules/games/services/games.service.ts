import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParamsHelper } from '@root/app/shared/utils/http-params-helper.service';
import { RequestGamesPayload } from '@root/app/main/modules/games/models/request-games.payload';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { Game } from '@root/app/shared/models/game';
import { environment } from '@root/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesService {

  constructor(
    private readonly http: HttpClient,
    private readonly paramsHelper: HttpParamsHelper,
  ) {
  }

  getGames(payload: RequestGamesPayload): Observable<PageableResponse<Game>> {
    const url = `${ environment.apiUrl }/games`;
    const params = this.paramsHelper.objectToHttpParams(payload);

    return this.http.get<PageableResponse<Game>>(url, {params});
  }
}
