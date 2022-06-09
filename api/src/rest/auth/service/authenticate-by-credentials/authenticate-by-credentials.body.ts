import { IsNotEmpty, MaxLength } from 'class-validator';

export class AuthenticateByCredentialsBody {

  @IsNotEmpty()
  @MaxLength(128)
  userName: string;

  @IsNotEmpty()
  @MaxLength(128)
  password: string;
}
