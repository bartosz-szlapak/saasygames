import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { trim } from '@app/shared/validation/transform-pipes/trim';

export class GetUserNameAvailabilityPayload {
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  userName: string;
}
