import { Inject, Injectable } from '@nestjs/common';
import {
  PatientAppointmentEmail,
  SendEmailAppointmentInterface,
} from '../../infra/gateways/appointment/send-email-appointment.interface';

@Injectable()
export class PatientAppointmentUseCase {
  constructor(
    @Inject('SendEmailAppointmentInterface')
    private readonly sendEmailAppointment: SendEmailAppointmentInterface,
  ) {}

  async execute(appointment: PatientAppointmentEmail): Promise<void> {
    await this.sendEmailAppointment.sendPatientEmailAppointment(appointment);
  }
}
