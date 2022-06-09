import { createAction, props } from '@ngrx/store';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { RequestMatchesPayload } from '@root/app/main/modules/lounge/models/request-matches.payload';
import { Match } from '@root/app/shared/models/match';
import { MatchPlayer } from '@root/app/shared/models/match-player';

export const requestMatches = createAction('Lounge / Request matches', props<{ payload: RequestMatchesPayload }>());
export const requestMatchesSuccess = createAction('Lounge / Request matches success', props<{ response: PageableResponse<Match> }>());
export const requestMatchesError = createAction('Lounge / Request matches error', props<{ error: any }>());

export const joinMatch = createAction('Lounge / Join match', props<{ matchId: string }>());
export const joinMatchSuccess = createAction('Lounge / Join match success', props<{ matchPlayer: MatchPlayer }>());
export const joinMatchError = createAction('Lounge / Join match error', props<{ error: any }>());
