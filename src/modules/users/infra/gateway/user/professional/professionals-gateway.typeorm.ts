import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfessionalsGatewayInterface } from './professionals-gateway.interface';
import { Roles } from 'src/shared/types/enum/roles.enum';

@Injectable()
export class ProfessionalsGatewayTypeorm
  implements ProfessionalsGatewayInterface
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByWithAvailabilityHours(
    where: Partial<User>,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        ...where,
        role: Roles.PROFESSIONAL,
      },
      relations: {
        professionalAttributes: {
          professionalAvailiableHours: true,
        },
      },
    });
  }
}
