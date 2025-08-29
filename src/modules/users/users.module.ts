import { Module } from '@nestjs/common';
import { UsersGatewayTypeorm } from './infra/gateway/users-gateway.typeorm';
import { FindOneByUseCase } from './domains/use-cases/find-one-by-id.use-case';
import { User } from 'src/core/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { RegisterUseCase } from './domains/use-cases/register.use-case';
import { UsersAuthModule } from '../users-auth/users-auth.module';

const GatewayProviders = {
  provide: 'UsersGatewayInterface',
  useClass: UsersGatewayTypeorm,
};

const UseCaseProviders = [FindOneByUseCase, RegisterUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersAuthModule],
  controllers: [UserController],
  providers: [GatewayProviders, ...UseCaseProviders],
  exports: [GatewayProviders, ...UseCaseProviders],
})
export class UsersModule {}
