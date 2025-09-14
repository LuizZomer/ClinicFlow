import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AppointmentsGatewayInterface } from '../../infra/appointment/appointments.interface';
import { AppointmentStatus } from 'src/shared/types/enum/appointment-status.enum';
import { Appointment } from 'src/core/entities/appointment.entity';

@Injectable()
export class CancelAppointmentUseCase {
  constructor(
    @Inject('AppointmentsGatewayInterface')
    private readonly appointmentsGateway: AppointmentsGatewayInterface,
  ) {}

  async execute(id: number) {
    const appointment = await this.appointmentsGateway.getOneBy({ id });

    if (!appointment) {
      throw new BadRequestException('Agendamento não encontrado!');
    }

    if (appointment.statusId === (AppointmentStatus.CANCELED as number)) {
      throw new BadRequestException('Agendamento já foi cancelado!');
    }

    const appointmentUpdated = new Appointment({
      ...appointment,
      statusId: AppointmentStatus.CANCELED,
    });

    await this.appointmentsGateway.update(appointmentUpdated);
  }
}
