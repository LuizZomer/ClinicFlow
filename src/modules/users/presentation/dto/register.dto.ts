import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  @IsString({ message: 'CPF deve ser uma string' })
  document: string;

  @IsString({ message: 'Email deve ser uma string' })
  email: string;

  @IsString({ message: 'Senha deve ser uma string' })
  password: string;
}
