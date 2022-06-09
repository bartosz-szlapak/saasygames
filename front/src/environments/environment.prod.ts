import { EnvironmentInterface } from '@root/environments/environment.interface';

export const environment: EnvironmentInterface = {
  production: true,
  apiUrl: 'http://localhost:3005',
  apiWsUrl: 'ws://localhost:3006',
  accessTokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
};
