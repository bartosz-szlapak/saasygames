import { Global, Module } from '@nestjs/common';
import { Logger } from '@app/shared/logger/logger';


@Global()
@Module({
  providers: [
    Logger,
  ],
  exports: [
    Logger,
  ],
})
export class LoggerModule {

}
