import { User } from 'src/core/entities/user.entity';
import { FindAllByUseCaseDto } from 'src/modules/users/presentation/dto/input/professional/find-all-by.use-case';

export interface ProfessionalsGatewayInterface {
  findOneByWithAvailabilityHours(where: Partial<User>): Promise<User | null>;
  findAllBy(where: FindAllByUseCaseDto): Promise<User[]>;
}
