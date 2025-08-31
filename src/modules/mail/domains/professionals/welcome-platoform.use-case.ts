import { Inject, Injectable } from '@nestjs/common';
import { SendEmailProfessionalInterface } from '../../infra/gateways/professionals/send-email-professional.interface';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class WelcomePlatformUseCase {
  constructor(
    @Inject('SendEmailProfessionalInterface')
    private readonly sendEmailProfessional: SendEmailProfessionalInterface,
  ) {}

  async execute(professional: Partial<User>, password: string): Promise<void> {
    await this.sendEmailProfessional.welcomeEmail(professional, password);
  }
}
