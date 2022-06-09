import { Transform } from 'class-transformer';
import { IsOptional, Max, MaxLength, Min } from 'class-validator';
import { numeric } from '@app/shared/validation/transform-pipes/numeric';
import { parseNumericArray } from '@app/shared/validation/transform-pipes/parse-numeric-array';
import { trim } from '@app/shared/validation/transform-pipes/trim';

export class GetMatchesParams {
  @Transform(numeric)
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 50;

  @Transform(numeric)
  @Min(0)
  @IsOptional()
  offset = 0;

  @Transform(parseNumericArray)
  @IsOptional()
  matchStatusId: number[];

  @Transform(trim)
  @IsOptional()
  @MaxLength(32)
  userName: string;
}
