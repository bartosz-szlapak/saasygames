import { LogLevelEnum } from '@app/shared/logger/log-level.enum';

export interface LogEntryPayload {
  data: any;
  level?: LogLevelEnum;
  category?: string;
}
