import { Transform } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';
import { numeric } from '@app/shared/validation/transform-pipes/numeric';

export class GetUsersPayload {
  @Transform(numeric)
  @IsOptional()
  limit = 20;

  @Transform(numeric)
  @Min(0)
  @IsOptional()
  offset = 0;
}
