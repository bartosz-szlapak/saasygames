import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { numeric } from '@app/shared/validation/transform-pipes/numeric';

export class UpdateUserPayload {
  @Transform(numeric)
  @IsOptional()
  statusId: number;
}
