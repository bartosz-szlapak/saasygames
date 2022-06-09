import { ValidationPipe } from '@nestjs/common';

export const Validate = () => new ValidationPipe({
  forbidUnknownValues: true,
  transform: true,
  whitelist: true,
});
