import { Inject, Injectable } from '@nestjs/common';
import {
  ProfessionalAppointmentEmail,
  SendEmailAppointmentInterface,
} from '../../infra/gateways/appointment/send-email-appointment.interface';

@Injectable()
export class ProfessionalAppointmentUseCase {
  constructor(
    @Inject('SendEmailAppointmentInterface')
    private readonly sendEmailAppointment: SendEmailAppointmentInterface,
  ) {}

  async execute(appointment: ProfessionalAppointmentEmail): Promise<void> {
    await this.sendEmailAppointment.sendProfessionalEmailAppointment(
      appointment,
    );
  }
}
