import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalCertificateType } from 'src/shared/types/enum/professionalCertificateTypes.enum';

export class ProfessionalAttributesDto {
  @ApiProperty({ enum: ProfessionalCertificateType, example: 'CRM' })
  certificateType: string;

  @ApiProperty({ type: 'string', example: '123456' })
  certificateNumber: string;
}

export class FindAllProfessionalByDto {
  @ApiProperty({ type: 'number', example: 1 })
  id: number;

  @ApiProperty({ type: 'string', example: 'John Doe' })
  name: string;

  @ApiProperty({ type: 'string', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ type: ProfessionalAttributesDto })
  professionalAttributes: ProfessionalAttributesDto;
}
