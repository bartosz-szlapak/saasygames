import { EnvironmentInterface } from '@root/environments/environment.interface';
import 'zone.js/dist/zone-error'; // Included with Angular CLI.

export const environment: EnvironmentInterface = {
  production: false,
  apiUrl: 'http://localhost:3005',
  apiWsUrl: 'ws://localhost:3006',
  accessTokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
};
