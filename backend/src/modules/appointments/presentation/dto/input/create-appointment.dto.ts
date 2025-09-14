import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: '2025-08-31T01:18:47.000Z' })
  @IsNotEmpty({ message: 'Horario não pode ser vazio' })
  @IsDateString({}, { message: 'Horario inválido' })
  scheduledAt: Date;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Paciente não pode ser vazio' })
  @IsNumber()
  patientId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Profissional não pode ser vazio' })
  @IsNumber()
  professionalId: number;
}
