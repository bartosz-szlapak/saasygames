import { createAction, props } from '@ngrx/store';
import { PlatformStats } from '@root/app/main/modules/main-page/modules/stats/models/platform-stats';
import { UserStats } from '@root/app/main/modules/main-page/modules/stats/models/user-stats';

export const requestPlatformStats = createAction('Stats / Request platform stats');
export const requestPlatformStatsSuccess = createAction('Stats / Request platform stats success', props<{ platformStats: PlatformStats }>());
export const requestPlatformStatsError = createAction('Stats / Request platform stats error', props<{ error: any }>());

export const requestUserStats = createAction('Stats / Request user stats');
export const requestUserStatsSuccess = createAction('Stats / Request user stats success', props<{ userStats: UserStats }>());
export const requestUserStatsError = createAction('Stats / Request user stats error', props<{ error: any }>());
