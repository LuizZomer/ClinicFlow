import { Module } from '@nestjs/common';
import { UsersAuthGatewayTypeorm } from './infra/gateways/users-auth.gateway';
import { FindUserAuthByUseCase } from './domain/use-cases/find-user-auth-by.use-case';
import { UserAuth } from 'src/core/entities/user-auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserAuthUseCase } from './domain/use-cases/create-user-auth.use-case';

const GatewayProviders = {
  provide: 'UsersAuthInterface',
  useClass: UsersAuthGatewayTypeorm,
};

const UseCaseProviders = [FindUserAuthByUseCase, CreateUserAuthUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([UserAuth])],
  providers: [GatewayProviders, ...UseCaseProviders],
  exports: [GatewayProviders, ...UseCaseProviders],
})
export class UsersAuthModule {}
