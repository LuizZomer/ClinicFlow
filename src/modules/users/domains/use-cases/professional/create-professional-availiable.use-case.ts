import { Inject, Injectable } from '@nestjs/common';
import { ProfessionalAvailiableHours } from 'src/core/entities/professional-availiable-hours.entity';
import { ProfessionalAvailiableHoursGatewayInterface } from 'src/modules/users/infra/gateway/professional-availiable-hours/professional-availiable-hours.interface';

@Injectable()
export class CreateProfessionalAvailiableUseCase {
  constructor(
    @Inject('ProfessionalAvailiableHoursGatewayInterface')
    private readonly professionalAvailiableHoursGateway: ProfessionalAvailiableHoursGatewayInterface,
  ) {}

  async execute(data: Partial<ProfessionalAvailiableHours>) {
    return this.professionalAvailiableHoursGateway.upsert(data);
  }
}
