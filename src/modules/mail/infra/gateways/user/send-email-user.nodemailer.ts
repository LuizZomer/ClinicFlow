import { Injectable } from '@nestjs/common';
import { SendEmailUserInterface } from './send-email-user.interface';
import { User } from 'src/core/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendEmailUserNodemailer implements SendEmailUserInterface {
  constructor(private readonly mailerService: MailerService) {}

  async welcomeEmail(user: Partial<User>, password: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Bem-vindo ao ClinicFlow',
      template: 'user/welcome',
      context: {
        name: user.name,
        password,
        document: user.document,
        year: new Date().getFullYear(),
      },
    });
  }
}
