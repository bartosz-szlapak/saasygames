import { Action, createReducer, on } from '@ngrx/store';
import {
  requestPlatformStats,
  requestPlatformStatsError,
  requestPlatformStatsSuccess,
  requestUserStats,
  requestUserStatsError,
  requestUserStatsSuccess,
} from './stats.actions';
import { PlatformStats } from '@root/app/main/modules/main-page/modules/stats/models/platform-stats';
import { UserStats } from '@root/app/main/modules/main-page/modules/stats/models/user-stats';


export const STATE_NAME = 'stats';

export interface State {
  platformStats?: PlatformStats;
  platformStatsLoading: boolean;
  platformStatsError: boolean;

  userStats?: UserStats;
  userStatsLoading: boolean;
  userStatsError: boolean;
}

const initialState: State = {
  platformStats: undefined,
  platformStatsLoading: false,
  platformStatsError: false,

  userStats: undefined,
  userStatsLoading: false,
  userStatsError: false,
};

const reducer = createReducer(
  initialState,
  on(requestPlatformStats, (state) => ({
    ...state,
    platformStats: undefined,
    platformStatsLoading: true,
    platformStatsError: false,
  })),
  on(requestPlatformStatsError, (state) => ({
    ...state,
    platformStatsLoading: false,
    platformStatsError: true,
  })),
  on(requestPlatformStatsSuccess, (state, action) => ({
    ...state,
    platformStats: action.platformStats,
    platformStatsLoading: false,
  })),

  on(requestUserStats, (state) => ({
    ...state,
    userStats: undefined,
    userStatsLoading: true,
    userStatsError: false,
  })),
  on(requestUserStatsError, (state) => ({
    ...state,
    userStatsLoading: false,
    userStatsError: true,
  })),
  on(requestUserStatsSuccess, (state, action) => ({
    ...state,
    userStats: action.userStats,
    userStatsLoading: false,
  })),
);

export function statsReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
