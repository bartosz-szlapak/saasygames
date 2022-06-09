import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { trim } from '@app/shared/validation/transform-pipes/trim';
import { HasDigit } from '@app/rest/user/validators/has-digit';
import { HasLowercase } from '@app/rest/user/validators/has-lowercase';
import { HasUppercase } from '@app/rest/user/validators/has-uppercase';

export class RegisterUserByCredentialsPayload {
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  @HasDigit()
  @HasLowercase()
  @HasUppercase()
  password: string;
}
