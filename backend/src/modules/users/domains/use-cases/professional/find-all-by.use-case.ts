import { Inject, Injectable } from '@nestjs/common';
import { ProfessionalsGatewayInterface } from 'src/modules/users/infra/gateway/user/professional/professionals-gateway.interface';
import { User } from 'src/core/entities/user.entity';
import { FindAllProfessionalByDto } from 'src/modules/users/presentation/dto/output/professional/find-all-professional-by.dto';
import { FindAllByUseCaseDto } from 'src/modules/users/presentation/dto/input/professional/find-all-by.use-case';

@Injectable()
export class FindAllProfessionalByUseCase {
  constructor(
    @Inject('ProfessionalsGatewayInterface')
    private readonly professionalsGateway: ProfessionalsGatewayInterface,
  ) {}

  async execute(
    where: FindAllByUseCaseDto,
  ): Promise<FindAllProfessionalByDto[]> {
    const users = await this.professionalsGateway.findAllBy(where);
    return users.map((user) => this.outputMapper(user));
  }

  private outputMapper(user: User): FindAllProfessionalByDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      professionalAttributes: {
        certificateType: user.professionalAttributes?.certificateType || '',
        certificateNumber: user.professionalAttributes?.certificateNumber || '',
      },
    };
  }
}
