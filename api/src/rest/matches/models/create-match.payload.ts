import { IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { numeric } from '@app/shared/validation/transform-pipes/numeric';
import { parseBoolean } from '@app/shared/validation/transform-pipes/parse-boolean';

export class CreateMatchPayload {
  @Transform(numeric)
  @IsInt()
  @IsNotEmpty()
  gameId: number;

  @ValidateNested({each: true})
  @Type(() => Player)
  players: Player[];
}

export class Player {
  @Transform(parseBoolean)
  @IsNotEmpty()
  isAi: boolean;

  @Transform(numeric)
  @IsInt()
  @IsOptional()
  aiDifficulty: number;
}
