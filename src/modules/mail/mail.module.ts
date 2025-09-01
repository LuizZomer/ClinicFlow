import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SendEmailUserNodemailer } from './infra/gateways/user/send-email-user.nodemailer';
import { WelcomePlatformUseCase } from './domains/user/welcome-platform.use-case';
import { join } from 'path';

const GatewayProviders = [
  {
    provide: 'SendEmailUserInterface',
    useClass: SendEmailUserNodemailer,
  },
];

const UseCaseProviders = [WelcomePlatformUseCase];

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get<string>('MAIL_HOST'),
            port: configService.get<number>('MAIL_PORT'),
            secure: false,
            auth: {
              user: configService.get<string>('MAIL_USER'),
              pass: configService.get<string>('MAIL_PASS'),
            },
          },
          defaults: {
            from: 'ClinicFlow <noreply@clinicflow.com>',
          },
          template: {
            dir: join(process.cwd(), 'src/modules/mail/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [...GatewayProviders, ...UseCaseProviders],
  exports: [...GatewayProviders, ...UseCaseProviders],
})
export class MailModule {}
