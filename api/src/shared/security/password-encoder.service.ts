import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordEncoderService {

  private readonly cost = 12;

  public encode(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, this.cost);
  }

  public validate(passwordHash: string, plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, passwordHash);
  }
}
