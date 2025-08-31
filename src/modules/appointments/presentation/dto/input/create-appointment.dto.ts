import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: '2025-08-31T01:18:47.000Z' })
  @IsNotEmpty()
  @IsDateString()
  scheduledAt: Date;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  professionalId: number;
}
