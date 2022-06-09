import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@app/shared/config/config.service';
import { TransformResponseInterceptor } from '@app/shared/transform-response.interceptor';
import { PasswordEncoderService } from '@app/shared/security/password-encoder.service';
import { TokenService } from '@app/shared/security/token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@app/shared/security/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/shared/security/guards/roles.guard';
import { JwtAuthGuard } from '@app/rest/auth/guards/jwt-auth.guard';


@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.config.tokenSecret,
      }),
    }),
  ],
  providers: [
    ConfigService,
    TransformResponseInterceptor,
    PasswordEncoderService,
    TokenService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [
    ConfigService,
    TransformResponseInterceptor,
    PasswordEncoderService,
    TokenService,
    JwtModule,
  ],
})
export class GlobalModule {
}
