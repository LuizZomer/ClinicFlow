import { Inject, Injectable } from '@nestjs/common';
import { AppointmentsGatewayInterface } from '../../infra/appointment/appointments.interface';
import { Appointment } from 'src/core/entities/appointment.entity';

@Injectable()
export class FindAllByUseCase {
  constructor(
    @Inject('AppointmentsGatewayInterface')
    private readonly appointmentsGateway: AppointmentsGatewayInterface,
  ) {}

  async execute(where: Partial<Appointment>): Promise<Appointment[]> {
    return this.appointmentsGateway.getAllBy(where);
  }
}
