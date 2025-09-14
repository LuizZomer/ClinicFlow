import { Inject, Injectable } from '@nestjs/common';
import { SendEmailUserInterface } from '../../infra/gateways/user/send-email-user.interface';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class WelcomePlatformUseCase {
  constructor(
    @Inject('SendEmailUserInterface')
    private readonly sendEmailUser: SendEmailUserInterface,
  ) {}

  async execute(user: Partial<User>, password: string): Promise<void> {
    await this.sendEmailUser.welcomeEmail(user, password);
  }
}
