import { Inject, Injectable } from '@nestjs/common';
import { AppointmentsGatewayInterface } from '../../infra/appointments.interface';
import { Appointment } from 'src/core/entities/appointment.entity';
import { CreateAppointmentDto } from '../../presentation/dto/input/create-appointment.dto';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject('AppointmentsGatewayInterface')
    private readonly appointmentsGateway: AppointmentsGatewayInterface,
  ) {}

  async execute(
    appointment: CreateAppointmentDto,
    user: User,
  ): Promise<Appointment> {
    const a = new Appointment({
      scheduledAt: appointment.scheduledAt,
      patient: user,
      professional: user,
    });

    return this.appointmentsGateway.create(a);
  }
}
