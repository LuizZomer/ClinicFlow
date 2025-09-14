import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/core/entities/user.entity';
import { UserResponseDto } from 'src/shared/docs/user-response.docs';

export class AppointmentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2025-08-31T01:18:47.000Z' })
  scheduledAt: Date;

  @ApiProperty({ type: () => UserResponseDto })
  patient: User;

  @ApiProperty({ type: () => UserResponseDto })
  professional: User;
}
