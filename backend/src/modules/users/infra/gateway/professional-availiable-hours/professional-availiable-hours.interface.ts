import { ProfessionalAvailiableHours } from 'src/core/entities/professional-availiable-hours.entity';

export interface ProfessionalAvailiableHoursGatewayInterface {
  deleteByProfessionalId(professionalId: number): Promise<void>;
  createAvailability(
    professionalId: number,
    availability: { dayOfWeek: number; hour: string }[],
  ): Promise<ProfessionalAvailiableHours[]>;
}
