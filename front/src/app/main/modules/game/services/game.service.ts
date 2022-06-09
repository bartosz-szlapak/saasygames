import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '@root/app/shared/models/game';
import { environment } from '@root/environments/environment';
import { CreateMatchPayload } from '@root/app/main/modules/game/models/create-match.payload';
import { Match } from '@root/app/shared/models/match';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  getGame(id: number): Observable<Game> {
    const url = `${ environment.apiUrl }/games/${ id }`;

    return this.http.get<Game>(url);
  }

  createMatch(payload: CreateMatchPayload): Observable<Match> {
    const url = `${ environment.apiUrl }/matches`;

    return this.http.post<Match>(url, payload);
  }
}
