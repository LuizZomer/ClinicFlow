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
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(appointment: Appointment): Promise<Appointment> {
    return this.appointmentRepository.save(appointment);
  }

  async getByProfessionalOrPatientIdAndTime(
    professionalId: number,
    patientId: number,
    scheduledAt: Date,
  ): Promise<Appointment | null> {
    const appointment = this.appointmentRepository
      .createQueryBuilder('appointment')
      .where(
        '(appointment.professionalId = :professionalId OR appointment.patientId = :patientId)',
        {
          professionalId,
          patientId,
        },
      )
      .andWhere('appointment.scheduledAt = :scheduledAt', { scheduledAt })
      .getOne();

    return appointment;
  }

  async update(appointment: Appointment): Promise<Appointment> {
    return this.appointmentRepository.save(appointment);
  }

  async getOneBy(where: Partial<Appointment>): Promise<Appointment | null> {
    return this.appointmentRepository.findOneBy(where);
  }
}
