import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@app/shared/config/config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.config.dbHost,
      port: this.configService.config.dbPort,
      username: this.configService.config.dbUsername,
      password: this.configService.config.dbPassword,
      database: this.configService.config.dbDatabaseName,
      entities: [
        './entity/*.entity.js',
        './dist/entity/*.entity.js',
      ],
      timezone: 'Z',
      logging: true,
      synchronize: this.configService.config.dbSynchronize,
    };
  }
}
