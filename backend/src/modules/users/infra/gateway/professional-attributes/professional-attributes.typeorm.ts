import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionalAttributes } from 'src/core/entities/professional-attributes.entity';
import { Repository } from 'typeorm';
import { ProfessionalAttributesGatewayInterface } from './professional-attributes.interface';

export class ProfessionalAttributesGatewayTypeorm
  implements ProfessionalAttributesGatewayInterface
{
  constructor(
    @InjectRepository(ProfessionalAttributes)
    private readonly repository: Repository<ProfessionalAttributes>,
  ) {}

  async create(
    professionalAttributes: Partial<ProfessionalAttributes>,
  ): Promise<ProfessionalAttributes> {
    return this.repository.save(professionalAttributes);
  }
}
