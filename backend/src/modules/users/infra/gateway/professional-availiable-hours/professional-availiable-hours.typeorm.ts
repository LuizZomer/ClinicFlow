import { ProfessionalAvailiableHours } from 'src/core/entities/professional-availiable-hours.entity';
import { ProfessionalAvailiableHoursGatewayInterface } from './professional-availiable-hours.interface';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfessionalAvailiableHoursGatewayTypeorm
  implements ProfessionalAvailiableHoursGatewayInterface
{
  constructor(private readonly dataSource: DataSource) {}

  async deleteByProfessionalId(professionalId: number): Promise<void> {
    await this.dataSource.getRepository(ProfessionalAvailiableHours).delete({
      professionalId,
    });
  }

  async createAvailability(
    professionalId: number,
    availability: { dayOfWeek: number; hour: string }[],
  ): Promise<ProfessionalAvailiableHours[]> {
    const repo = this.dataSource.getRepository(ProfessionalAvailiableHours);

    const entities = availability.map((a) =>
      repo.create({ professionalId, dayOfWeek: a.dayOfWeek, hour: a.hour }),
    );

    return repo.save(entities);
  }
}
