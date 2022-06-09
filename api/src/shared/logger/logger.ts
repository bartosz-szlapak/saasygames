import { Injectable } from '@nestjs/common';
import { serializeError } from 'serialize-error';
import { LogLevelEnum } from '@app/shared/logger/log-level.enum';
import { LogEntryPayload } from '@app/shared/logger/log-entry.payload';

@Injectable()
export class Logger {
  log(payload: LogEntryPayload): void {
    const valueToLog = {
      level: payload.level ?? LogLevelEnum.default,
      category: payload.category ?? 'uncategorized',
      timestamp: new Date().toISOString(),
      data: serializeError(payload.data),
    };
    console.log(valueToLog);
  }
}
