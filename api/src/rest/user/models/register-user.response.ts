import { User } from '@app/entity/user.entity';

export interface RegisterUserResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
