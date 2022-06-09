import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { numeric } from '@app/shared/validation/transform-pipes/numeric';

export class GameIdParam {
  @Transform(numeric)
  @IsInt()
  gameId: number;
}
