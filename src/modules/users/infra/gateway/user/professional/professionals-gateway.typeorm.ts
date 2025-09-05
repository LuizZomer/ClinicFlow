import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfessionalsGatewayInterface } from './professionals-gateway.interface';
import { Roles } from 'src/shared/types/enum/roles.enum';
import { FindAllByUseCaseDto } from 'src/modules/users/presentation/dto/input/professional/find-all-by.use-case';

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

  async findAllBy(where: FindAllByUseCaseDto): Promise<User[]> {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        'user.professionalAttributes',
        'professionalAttributes',
      )
      .leftJoinAndSelect(
        'professionalAttributes.professionalAvailiableHours',
        'professionalAvailiableHours',
      )
      .where('user.role = :role', { role: Roles.PROFESSIONAL });

    if (where.id) {
      qb.andWhere('user.id = :id', { id: where.id });
    }

    if (where.name) {
      qb.andWhere('user.name ILIKE :name', { name: `%${where.name}%` });
    }

    if (where.email) {
      qb.andWhere('user.email ILIKE :email', { email: `%${where.email}%` });
    }

    if (where.certificateType) {
      qb.andWhere('professionalAttributes.certificateType = :certificateType', {
        certificateType: where.certificateType,
      });
    }

    if (where.certificateNumber) {
      qb.andWhere(
        'professionalAttributes.certificateNumber = :certificateNumber',
        {
          certificateNumber: where.certificateNumber,
        },
      );
    }

    return qb.getMany();
  }
}
