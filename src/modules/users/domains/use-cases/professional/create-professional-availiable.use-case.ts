import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfessionalAvailiableHours } from 'src/core/entities/professional-availiable-hours.entity';
import { ProfessionalAvailiableHoursGatewayInterface } from 'src/modules/users/infra/gateway/professional-availiable-hours/professional-availiable-hours.interface';
import { UsersGatewayInterface } from 'src/modules/users/infra/gateway/user/users-gateway.interface';
import { UpdateAvailabilityDto } from 'src/modules/users/presentation/dto/input/update-professional-availability.dto';
import { Roles } from 'src/shared/types/enum/roles.enum';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateProfessionalAvailiableUseCase {
  constructor(
    @Inject('ProfessionalAvailiableHoursGatewayInterface')
    private readonly professionalAvailiableHoursGateway: ProfessionalAvailiableHoursGatewayInterface,
    @Inject('UsersGatewayInterface')
    private readonly usersGateway: UsersGatewayInterface,
    private readonly dataSource: DataSource,
  ) {}

  async execute(professionalId: number, data: UpdateAvailabilityDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const professional = await this.findProfessionalById(professionalId);
    this.verifyUserRole(professional.role);

    try {
      // 1. Apaga os horários antigos do profissional
      await queryRunner.manager.delete(ProfessionalAvailiableHours, {
        professionalId,
      });

      // 2. Cria as novas entidades de disponibilidade
      const newAvailability = data.availability.map((a) =>
        queryRunner.manager.create(ProfessionalAvailiableHours, {
          professionalId,
          dayOfWeek: a.dayOfWeek,
          hour: a.hour,
        }),
      );

      // 3. Salva no banco
      await queryRunner.manager.save(
        ProfessionalAvailiableHours,
        newAvailability,
      );

      // 4. Commit
      await queryRunner.commitTransaction();

      return { success: true, availability: newAvailability };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private async findProfessionalById(professionalId: number) {
    const professional = await this.usersGateway.findOneBy({
      id: professionalId,
    });
    if (!professional) {
      throw new NotFoundException('Profissional não encontrado!');
    }
    return professional;
  }

  private verifyUserRole(role: Roles) {
    if (role !== Roles.PROFESSIONAL) {
      throw new BadRequestException('Profissional inválido!');
    }
  }
}
