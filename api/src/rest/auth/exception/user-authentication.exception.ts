import { BadRequestException } from '@nestjs/common';

export abstract class UserAuthenticationException extends BadRequestException {
  public readonly message = 'Invalid credentials';
}
