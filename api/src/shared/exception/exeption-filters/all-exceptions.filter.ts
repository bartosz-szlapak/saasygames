import { ArgumentsHost, Catch, HttpException, HttpServer } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from '@app/shared/logger/logger';
import { LogLevelEnum } from '@app/shared/logger/log-level.enum';
import { ConfigService } from '@app/shared/config/config.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    applicationRef?: HttpServer,
  ) {
    super(applicationRef);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      if (exception.getStatus() >= 500) {
        this.logException(exception);
      }
    } else {
      this.logException(exception);
    }

    super.catch(exception, host);
  }

  private logException(exception: any): void {


    this.logger.log({data: exception, level: LogLevelEnum.error, category: 'application-error'});
  }
}
