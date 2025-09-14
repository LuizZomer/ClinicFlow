import { Appointment } from 'src/core/entities/appointment.entity';

export interface AppointmentsGatewayInterface {
  create(appointment: Appointment): Promise<Appointment>;
  update(appointment: Appointment): Promise<Appointment>;
  getByProfessionalOrPatientIdAndTime(
    professionalId: number,
    patientId: number,
    scheduledAt: Date,
  ): Promise<Appointment | null>;
  getOneBy(where: Partial<Appointment>): Promise<Appointment | null>;
  getAllBy(where: Partial<Appointment>): Promise<Appointment[]>;
}
