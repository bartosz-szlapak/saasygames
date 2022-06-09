export interface Config {
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbDatabaseName: string;
  dbSynchronize: boolean;
  tokenSecret: string;
  tokenTtlInSeconds: number;
  refreshTokenTtlInSeconds: number;
}
