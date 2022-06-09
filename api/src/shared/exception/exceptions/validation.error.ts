import { BadRequestException } from '@nestjs/common';
import { ErrorStatusEnum } from '@app/shared/error/error-status.enum';

export class ValidationError extends BadRequestException {
  constructor(objectOrError: string | { errorStatus: ErrorStatusEnum, message: string }) {
    super(objectOrError);
  }
}
