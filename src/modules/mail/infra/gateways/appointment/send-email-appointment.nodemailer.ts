import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {
  PatientAppointmentEmail,
  ProfessionalAppointmentEmail,
  SendEmailAppointmentInterface,
} from './send-email-appointment.interface';

@Injectable()
export class SendEmailAppointmentNodemailer
  implements SendEmailAppointmentInterface
{
  constructor(private readonly mailerService: MailerService) {}

  async sendPatientEmailAppointment(
    appointmentEmail: PatientAppointmentEmail,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: appointmentEmail.patientEmail,
      subject: 'Agendamento confirmado',
      template: 'appointment/patient',
      context: {
        patientName: appointmentEmail.patientName,
        professionalName: appointmentEmail.professionalName,
        scheduledAt: appointmentEmail.scheduledAt,
      },
    });
  }

  async sendProfessionalEmailAppointment(
    appointmentEmail: ProfessionalAppointmentEmail,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: appointmentEmail.professionalEmail,
      subject: 'Novo agendamento',
      template: 'appointment/professional',
      context: {
        patientName: appointmentEmail.patientName,
        professionalName: appointmentEmail.professionalName,
        scheduledAt: appointmentEmail.scheduledAt,
      },
    });
  }
}
