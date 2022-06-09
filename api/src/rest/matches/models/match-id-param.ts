import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { trim } from '@app/shared/validation/transform-pipes/trim';

export class MatchIdParam {
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  matchId: string;
}
