import { User } from 'src/core/entities/user.entity';

export interface ProfessionalsGatewayInterface {
  findOneByWithAvailabilityHours(where: Partial<User>): Promise<User | null>;
}
