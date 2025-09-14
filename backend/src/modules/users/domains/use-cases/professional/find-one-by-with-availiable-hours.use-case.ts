import { Injectable } from '@nestjs/common';
import { ProfessionalsGatewayInterface } from 'src/modules/users/infra/gateway/user/professional/professionals-gateway.interface';
import { Inject } from '@nestjs/common';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class FindOneByWithAvailiableHoursUseCase {
  constructor(
    @Inject('ProfessionalsGatewayInterface')
    private readonly professionalsGateway: ProfessionalsGatewayInterface,
  ) {}

  async execute(where: Partial<User>): Promise<User | null> {
    return this.professionalsGateway.findOneByWithAvailabilityHours(where);
  }
}
