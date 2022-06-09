import { IsNotEmpty, MaxLength } from 'class-validator';

export class RefreshTokenBody {
  @IsNotEmpty()
  @MaxLength(4096)
  refreshToken: string;
}
