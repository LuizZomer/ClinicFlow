import { ProfessionalAttributes } from 'src/core/entities/professional-attributes.entity';

export interface ProfessionalAttributesGatewayInterface {
  create(
    professionalAttributes: Partial<ProfessionalAttributes>,
  ): Promise<ProfessionalAttributes>;
}
