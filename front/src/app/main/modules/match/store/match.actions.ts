import { createAction, props } from '@ngrx/store';
import { Match } from '@root/app/shared/models/match';


export const requestMatch = createAction('Match / Request matches', props<{ id: number }>());
export const requestMatchSuccess = createAction('Match / Request matches success', props<{ match: Match }>());
export const requestMatchError = createAction('Match / Request matches error', props<{ error: any }>());

