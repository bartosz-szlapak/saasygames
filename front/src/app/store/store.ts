import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface RootState {
  router: RouterReducerState<any>;
}

export const rootReducers: ActionReducerMap<RootState> = {
  router: routerReducer,
};

