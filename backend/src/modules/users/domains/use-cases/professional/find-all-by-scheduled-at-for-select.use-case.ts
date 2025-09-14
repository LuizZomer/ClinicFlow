import { Inject, Injectable } from '@nestjs/common';
import { ProfessionalsGatewayInterface } from 'src/modules/users/infra/gateway/user/professional/professionals-gateway.interface';
import { FindForSelectDocs } from 'src/shared/docs/find-for-select.docs';

@Injectable()
export class FindAllByScheduledAtForSelectUseCase {
  constructor(
    @Inject('ProfessionalsGatewayInterface')
    private readonly professionalsGateway: ProfessionalsGatewayInterface,
  ) {}

  async execute(scheduledAt: Date): Promise<FindForSelectDocs[]> {
    const professionals =
      await this.professionalsGateway.findAllByScheduledAtForSelect(
        scheduledAt,
      );

    return professionals.map((professional) => ({
      label: professional.name,
      value: professional.id,
    }));
  }
}
