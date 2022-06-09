import { User } from '@root/app/shared/models/user';

export interface CreateAccountResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
