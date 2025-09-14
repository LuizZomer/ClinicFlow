import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ProfessionalCertificateType } from 'src/shared/types/enum/professionalCertificateTypes.enum';

export class CreateProfessionalDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  @ApiProperty({ example: '12345678901' })
  @IsString({ message: 'CPF deve ser uma string' })
  document: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsString({ message: 'Email deve ser uma string' })
  email: string;

  @ApiProperty({ example: 'CRM' })
  @IsEnum(ProfessionalCertificateType, {
    message: 'Certificado deve ser uma string',
  })
  certificateType: ProfessionalCertificateType;

  @ApiProperty({ example: '123456' })
  @IsString({ message: 'Número do certificado deve ser uma string' })
  certificateNumber: string;
}
