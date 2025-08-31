import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/core/entities/appointment.entity';
import { AppointmentsGatewayTypeorm } from './infra/appointments.typeorm';
import { AppointmentController } from './presentation/controllers/appointment.controller';
import { CreateAppointmentUseCase } from './domains/use-cases/create-appointment.use-case';

const gatewaysProviders = [
  {
    provide: 'AppointmentsGatewayInterface',
    useClass: AppointmentsGatewayTypeorm,
  },
];

const useCaseProviders = [CreateAppointmentUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [...gatewaysProviders, ...useCaseProviders],
  exports: [...gatewaysProviders, ...useCaseProviders],
})
export class AppointmentsModule {}
