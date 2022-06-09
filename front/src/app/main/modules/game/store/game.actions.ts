import { createAction, props } from '@ngrx/store';
import { Game } from '@root/app/shared/models/game';
import { CreateMatchPayload } from '@root/app/main/modules/game/models/create-match.payload';
import { Match } from '@root/app/shared/models/match';

export const requestGame = createAction('Game / Request game', props<{ id: number }>());
export const requestGameSuccess = createAction('Game / Request game success', props<{ game: Game }>());
export const requestGameError = createAction('Game / Request game error', props<{ error: any }>());

export const createMatch = createAction('Match / Create matches', props<{ payload: CreateMatchPayload }>());
export const createMatchSuccess = createAction('Match / Create matches success', props<{ match: Match }>());
export const createMatchError = createAction('Match / Create matches error', props<{ error: any }>());
