import { User } from 'src/core/entities/user.entity';

export interface SendEmailProfessionalInterface {
  welcomeEmail(professional: Partial<User>, password: string): Promise<void>;
}
