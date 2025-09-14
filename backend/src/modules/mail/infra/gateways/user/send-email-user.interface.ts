import { User } from 'src/core/entities/user.entity';

export interface SendEmailUserInterface {
  welcomeEmail(user: Partial<User>, password: string): Promise<void>;
}
