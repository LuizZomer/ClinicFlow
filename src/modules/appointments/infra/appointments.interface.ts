import { Appointment } from 'src/core/entities/appointment.entity';

export interface AppointmentsGatewayInterface {
  create(appointment: Appointment): Promise<Appointment>;
}
