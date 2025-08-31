import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  @ApiProperty({ example: '12345678901' })
  @IsString({ message: 'CPF deve ser uma string' })
  document: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsString({ message: 'Email deve ser uma string' })
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString({ message: 'Senha deve ser uma string' })
  password: string;
}
