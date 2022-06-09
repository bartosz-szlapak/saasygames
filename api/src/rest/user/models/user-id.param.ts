import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { numeric } from '@app/shared/validation/transform-pipes/numeric';

export class UserIdParam {
  @Transform(numeric)
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
