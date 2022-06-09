import { createAction, props } from '@ngrx/store';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { RequestGamesPayload } from '@root/app/main/modules/games/models/request-games.payload';
import { Game } from '@root/app/shared/models/game';

export const requestGames = createAction('Games / Request games', props<{ payload: RequestGamesPayload }>());
export const requestGamesSuccess = createAction('Games / Request games success', props<{ response: PageableResponse<Game> }>());
export const requestGamesError = createAction('Games / Request games error', props<{ error: any }>());
