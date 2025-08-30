import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { LocalAuthUseCase } from './domain/use-cases/local-auth.use-case';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAuthUseCase } from './domain/use-cases/jwt-auth.use-case';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [LocalAuthUseCase, LocalStrategy, JwtAuthUseCase, JwtStrategy],
  exports: [],
})
export class AuthModule {}
