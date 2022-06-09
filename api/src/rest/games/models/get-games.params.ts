import { Transform } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';
import { numeric } from '@app/shared/validation/transform-pipes/numeric';

export class GetGamesParams {
  @Transform(numeric)
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 50;

  @Transform(numeric)
  @Min(0)
  @IsOptional()
  offset = 0;
}
