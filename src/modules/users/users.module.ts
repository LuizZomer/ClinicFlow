import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalAttributes } from 'src/core/entities/professional-attributes.entity';
import { ProfessionalAvailiableHours } from 'src/core/entities/professional-availiable-hours.entity';
import { UserAuth } from 'src/core/entities/user-auth.entity';
import { User } from 'src/core/entities/user.entity';
import { CreateProfessionalAvailiableUseCase } from './domains/use-cases/professional/create-professional-availiable.use-case';
import { CreateProfessionalUseCase } from './domains/use-cases/professional/create-professional.use-case';
import { CreateUserAuthUseCase } from './domains/use-cases/user-auth/create-user-auth.use-case';
import { FindUserAuthByUseCase } from './domains/use-cases/user-auth/find-user-auth-by.use-case';
import { FindUserOneByUseCase } from './domains/use-cases/user/find-one-by-id.use-case';
import { RegisterUseCase } from './domains/use-cases/user/register.use-case';
import { ProfessionalAttributesGatewayTypeorm } from './infra/gateway/professional-attributes/professional-attributes.typeorm';
import { ProfessionalAvailiableHoursGatewayTypeorm } from './infra/gateway/professional-availiable-hours/professional-availiable-hours.typeorm';
import { UsersAuthGatewayTypeorm } from './infra/gateway/user-auth/users-auth.gateway';
import { UsersGatewayTypeorm } from './infra/gateway/user/users-gateway.typeorm';
import { OperatorController } from './presentation/controllers/operator.controller';
import { ProfessionalController } from './presentation/controllers/professional.controller';
import { MailModule } from '../mail/mail.module';
import { PatientController } from './presentation/controllers/patient.controller';
import { ProfessionalsGatewayTypeorm } from './infra/gateway/user/professional/professionals-gateway.typeorm';
import { FindOneByWithAvailiableHoursUseCase } from './domains/use-cases/professional/find-one-by-with-availiable-hours.use-case';

const GatewayProviders = [
  {
    provide: 'UsersGatewayInterface',
    useClass: UsersGatewayTypeorm,
  },
  {
    provide: 'UsersAuthGatewayInterface',
    useClass: UsersAuthGatewayTypeorm,
  },
  {
    provide: 'ProfessionalAttributesGatewayInterface',
    useClass: ProfessionalAttributesGatewayTypeorm,
  },
  {
    provide: 'ProfessionalAvailiableHoursGatewayInterface',
    useClass: ProfessionalAvailiableHoursGatewayTypeorm,
  },
  {
    provide: 'ProfessionalsGatewayInterface',
    useClass: ProfessionalsGatewayTypeorm,
  },
];

const UseCaseProviders = [
  FindUserOneByUseCase,
  RegisterUseCase,
  CreateUserAuthUseCase,
  FindUserAuthByUseCase,
  CreateProfessionalUseCase,
  CreateProfessionalAvailiableUseCase,
  FindOneByWithAvailiableHoursUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserAuth,
      ProfessionalAttributes,
      ProfessionalAvailiableHours,
    ]),
    MailModule,
  ],
  controllers: [OperatorController, ProfessionalController, PatientController],
  providers: [...GatewayProviders, ...UseCaseProviders],
  exports: [...GatewayProviders, ...UseCaseProviders],
})
export class UsersModule {}
