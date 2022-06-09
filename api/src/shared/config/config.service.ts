import { ConfigService as NestConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ConfigValueTypeEnum } from '@app/shared/config/config-value-type.enum';
import { Config } from '@app/shared/config/config';

@Injectable()
export class ConfigService {

  public readonly config: Config;

  constructor(
    private readonly nestConfigService: NestConfigService,
  ) {
    this.config = this.initConfig();
  }

  get(key: string, type: ConfigValueTypeEnum = ConfigValueTypeEnum.string): any {
    let value = this.nestConfigService.get(key);
    if (value == null || value.trim() === '') {
      throw new Error(`Empty or undefined config value: ${ key }`);
    }

    value = value.trim();
    switch (type) {
      case ConfigValueTypeEnum.boolean: {
        return value === 'true' || value === true;
      }
      case ConfigValueTypeEnum.number: {
        const parsed = Number(value);
        if (isNaN(parsed)) {
          throw new Error(`Invalid numeric config value: ${ key }`);
        }

        return parsed;
      }
      default:
        return value;
    }
  }

  private initConfig(): Config {
    const config: Config = {
      dbSynchronize: this.get('DB_SYNCHRONIZE', ConfigValueTypeEnum.boolean),
      dbHost: this.get('DB_HOST'),
      dbPort: this.get('DB_PORT', ConfigValueTypeEnum.number),
      dbUsername: this.get('DB_USERNAME'),
      dbPassword: this.get('DB_PASSWORD'),
      dbDatabaseName: this.get('DB_DATABASE_NAME'),
      tokenSecret: this.get('TOKEN_SECRET'),
      tokenTtlInSeconds: this.get('TOKEN_TTL_IN_SECONDS', ConfigValueTypeEnum.number),
      refreshTokenTtlInSeconds: this.get('REFRESH_TOKEN_TTL_IN_SECONDS', ConfigValueTypeEnum.number),
    };
    Object.freeze(config);

    return config;
  }
}
