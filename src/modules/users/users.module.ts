import { Module } from '@nestjs/common';
import { FindUserOneByUseCase } from './domains/use-cases/user/find-one-by-id.use-case';
import { User } from 'src/core/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { RegisterUseCase } from './domains/use-cases/user/register.use-case';
import { UserAuth } from 'src/core/entities/user-auth.entity';
import { CreateUserAuthUseCase } from './domains/use-cases/user-auth/create-user-auth.use-case';
import { UsersGatewayTypeorm } from './infra/gateway/user/users-gateway.typeorm';
import { UsersAuthGatewayTypeorm } from './infra/gateway/user-auth/users-auth.gateway';
import { FindUserAuthByUseCase } from './domains/use-cases/user-auth/find-user-auth-by.use-case';

const GatewayProviders = [
  {
    provide: 'UsersGatewayInterface',
    useClass: UsersGatewayTypeorm,
  },
  {
    provide: 'UsersAuthInterface',
    useClass: UsersAuthGatewayTypeorm,
  },
];

const UseCaseProviders = [
  FindUserOneByUseCase,
  RegisterUseCase,
  CreateUserAuthUseCase,
  FindUserAuthByUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAuth])],
  controllers: [UserController],
  providers: [...GatewayProviders, ...UseCaseProviders],
  exports: [...GatewayProviders, ...UseCaseProviders],
})
export class UsersModule {}
