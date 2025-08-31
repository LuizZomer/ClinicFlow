import { Injectable } from '@nestjs/common';
import { SendEmailProfessionalInterface } from './send-email-professional.interface';
import { User } from 'src/core/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendEmailProfessionalNodemailer
  implements SendEmailProfessionalInterface
{
  constructor(private readonly mailerService: MailerService) {}

  async welcomeEmail(
    professional: Partial<User>,
    password: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: professional.email,
      subject: 'Bem-vindo ao ClinicFlow',
      template: 'professionals/welcome',
      context: {
        name: professional.name,
        password,
        document: professional.document,
        year: new Date().getFullYear(),
      },
    });
  }
}
