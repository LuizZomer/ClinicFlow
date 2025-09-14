import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/core/entities/appointment.entity';
import { AppointmentsGatewayTypeorm } from './infra/appointment/appointments.typeorm';
import { AppointmentController } from './presentation/controllers/appointment.controller';
import { CreateAppointmentUseCase } from './domains/use-cases/create-appointment.use-case';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { CancelAppointmentUseCase } from './domains/use-cases/cancel-appointment.use-case';
import { FindAllByUseCase } from './domains/use-cases/find-all-by.use-case';

const gatewaysProviders = [
  {
    provide: 'AppointmentsGatewayInterface',
    useClass: AppointmentsGatewayTypeorm,
  },
];

const useCaseProviders = [
  CreateAppointmentUseCase,
  CancelAppointmentUseCase,
  FindAllByUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), UsersModule, MailModule],
  controllers: [AppointmentController],
  providers: [...gatewaysProviders, ...useCaseProviders],
  exports: [...gatewaysProviders, ...useCaseProviders],
})
export class AppointmentsModule {}
