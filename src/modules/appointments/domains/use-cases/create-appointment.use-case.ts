import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Appointment } from 'src/core/entities/appointment.entity';
import { ProfessionalAvailiableHours } from 'src/core/entities/professional-availiable-hours.entity';
import { FindOneByWithAvailiableHoursUseCase } from 'src/modules/users/domains/use-cases/professional/find-one-by-with-availiable-hours.use-case';
import { FindUserOneByUseCase } from 'src/modules/users/domains/use-cases/user/find-one-by-id.use-case';
import { DayOfWeek } from 'src/shared/types/enum/day-of-week.enum';
import { AppointmentsGatewayInterface } from '../../infra/appointments.interface';
import { CreateAppointmentDto } from '../../presentation/dto/input/create-appointment.dto';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject('AppointmentsGatewayInterface')
    private readonly appointmentsGateway: AppointmentsGatewayInterface,
    private readonly findOneByWithAvailiableHoursUseCase: FindOneByWithAvailiableHoursUseCase,
    private readonly findUserOneByUseCase: FindUserOneByUseCase,
  ) {}

  async execute(dto: CreateAppointmentDto) {
    const scheduledAtDate = new Date(dto.scheduledAt);

    this.validatePastDate(scheduledAtDate);

    this.validateWithinWorkingHours(scheduledAtDate);

    const patient = await this.findUserOneByUseCase.execute({
      id: dto.patientId,
    });

    if (!patient) {
      throw new BadRequestException('Paciente não encontrado!');
    }

    const professional = await this.findOneByWithAvailiableHoursUseCase.execute(
      {
        id: dto.professionalId,
      },
    );

    if (!professional) {
      throw new BadRequestException('Profissional não encontrado!');
    }

    if (!professional.professionalAttributes.professionalAvailiableHours) {
      throw new BadRequestException('Profissional não disponivel!');
    }

    this.validateProfessionalAvailabilityHours(
      professional.professionalAttributes.professionalAvailiableHours,
      scheduledAtDate,
    );

    await this.findAppointmentByProfessionalOrPatientIdAndTime(
      dto.professionalId,
      dto.patientId,
      scheduledAtDate,
    );

    const appointment = new Appointment({
      scheduledAt: dto.scheduledAt,
      patient: patient,
      professional: professional,
    });

    return this.appointmentsGateway.create(appointment);
  }

  private validatePastDate(scheduledAt: Date) {
    const now = new Date();
    if (scheduledAt < now) {
      throw new BadRequestException(
        'Não é possível agendar um horário no passado!',
      );
    }
  }

  validateWithinWorkingHours(scheduledAt: Date) {
    const hour = scheduledAt.getUTCHours();
    if (hour < 8 || hour > 18) {
      throw new BadRequestException('Horário fora do expediente!');
    }
  }

  private validateProfessionalAvailabilityHours(
    professionalAvailabilityHours: ProfessionalAvailiableHours[],
    scheduledAt: Date,
  ) {
    const scheduledDayOfWeek = scheduledAt.getUTCDay() as DayOfWeek;
    const scheduledHour = scheduledAt.toISOString().substring(11, 19);

    const professionalAvailabilityHour = professionalAvailabilityHours.find(
      (hour) =>
        hour.hour === scheduledHour && hour.dayOfWeek === scheduledDayOfWeek,
    );

    if (!professionalAvailabilityHour) {
      throw new BadRequestException('Horário não disponível');
    }
  }

  private async findAppointmentByProfessionalOrPatientIdAndTime(
    professionalId: number,
    patientId: number,
    scheduledAt: Date,
  ) {
    const appointment =
      await this.appointmentsGateway.getByProfessionalOrPatientIdAndTime(
        professionalId,
        patientId,
        scheduledAt,
      );

    if (appointment) {
      throw new BadRequestException('Horário não disponível');
    }

    return appointment;
  }
}
