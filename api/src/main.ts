import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import {
  EntityNotFoundExceptionFilterExceptionFilter
} from '@app/shared/exception/exeption-filters/entity-not-found.exception-filter';
import { AllExceptionsFilter } from '@app/shared/exception/exeption-filters/all-exceptions.filter';
import { Logger } from '@app/shared/logger/logger';
import { ConfigService } from '@app/shared/config/config.service';

Error.stackTraceLimit = 50000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: [
      'log',
      'error',
      'warn',
      'debug',
      'verbose',
    ],
  });
  app.enableCors();
  const configService = app.get(ConfigService);


  const {httpAdapter} = app.get(HttpAdapterHost);
  const logger = app.get(Logger);
  app.useGlobalFilters(
    new AllExceptionsFilter(logger, configService, httpAdapter),
    new EntityNotFoundExceptionFilterExceptionFilter(),
  );
  useContainer(app.select(AppModule), {fallbackOnErrors: true});
  await app.listen(3005);
}

bootstrap();
