import { ProfessionalAvailiableHours } from 'src/core/entities/professional-availiable-hours.entity';
import { ProfessionalAvailiableHoursGatewayInterface } from './professional-availiable-hours.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfessionalAvailiableHoursGatewayTypeorm
  implements ProfessionalAvailiableHoursGatewayInterface
{
  constructor(
    @InjectRepository(ProfessionalAvailiableHours)
    private readonly repository: Repository<ProfessionalAvailiableHours>,
  ) {}

  async upsert(
    professionalAvailiableHours: Partial<ProfessionalAvailiableHours>,
  ): Promise<ProfessionalAvailiableHours> {
    return this.repository.save(professionalAvailiableHours);
  }
}
