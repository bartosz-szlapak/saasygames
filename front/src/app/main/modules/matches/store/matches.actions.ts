import { createAction, props } from '@ngrx/store';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { RequestMatchesPayload } from '@root/app/main/modules/matches/models/request-matches.payload';
import { Match } from '@root/app/shared/models/match';

export const requestMatches = createAction('Matches / Request matches', props<{ payload: RequestMatchesPayload }>());
export const requestMatchesSuccess = createAction('Matches / Request matches success', props<{ response: PageableResponse<Match> }>());
export const requestMatchesError = createAction('Matches / Request matches error', props<{ error: any }>());
