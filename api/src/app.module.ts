import { Module } from '@nestjs/common';
import { AuthModule } from './rest/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './typeorm/type-orm-config.service';
import { UserModule } from '@app/rest/user/user.module';
import { GlobalModule } from '@app/shared/global/global.module';
import { LoggerModule } from '@app/shared/logger/logger.module';
import { GamesModule } from '@app/rest/games/games.module';
import { MatchesModule } from '@app/rest/matches/matches.module';
import { MatchesGatewayModule } from '@app/gateway/matches/matches-gateway.module';
import { StatsModule } from '@app/rest/stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    GlobalModule,
    LoggerModule,
    GamesModule,
    UserModule,
    MatchesModule,
    MatchesGatewayModule,
    StatsModule
  ],
})
export class AppModule {
}
