import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/core/entities/user.entity';
import { UserResponseDto } from '../../../../../shared/docs/user-response.docs';

export class RegisterResponseDto {
  @ApiProperty({ example: 201 })
  status: number;

  @ApiProperty({ type: () => UserResponseDto })
  content: User;
}
