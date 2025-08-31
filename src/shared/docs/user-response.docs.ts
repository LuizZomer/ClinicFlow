import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '123' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: '12345678900' })
  document: string;

  @ApiProperty({ example: 'john.doe@email.com' })
  email: string;
}
