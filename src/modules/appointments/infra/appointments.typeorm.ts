import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/core/entities/appointment.entity';
import { Repository } from 'typeorm';
import { AppointmentsGatewayInterface } from './appointments.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentsGatewayTypeorm
  implements AppointmentsGatewayInterface
{
  constructor(
    @InjectRepository(Appointment)
    private readonly repository: Repository<Appointment>,
  ) {}

  async create(appointment: Appointment): Promise<Appointment> {
    return this.repository.save(appointment);
  }
}
