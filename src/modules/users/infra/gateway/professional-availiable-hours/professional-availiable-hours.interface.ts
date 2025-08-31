import { ProfessionalAvailiableHours } from 'src/core/entities/professional-availiable-hours.entity';

export interface ProfessionalAvailiableHoursGatewayInterface {
  upsert(
    professionalAvailiableHours: Partial<ProfessionalAvailiableHours>,
  ): Promise<ProfessionalAvailiableHours>;
}
