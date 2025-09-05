import { Injectable } from '@nestjs/common';
import { ProfessionalAttributesGatewayInterface } from 'src/modules/users/infra/gateway/professional-attributes/professional-attributes.interface';
import { Inject } from '@nestjs/common';
import { UsersGatewayInterface } from 'src/modules/users/infra/gateway/user/users-gateway.interface';
import { CreateProfessionalDto } from 'src/modules/users/presentation/dto/input/professional/create-professional.dto';
import { ProfessionalAttributes } from 'src/core/entities/professional-attributes.entity';
import { User } from 'src/core/entities/user.entity';
import { UsersAuthGatewayInterface } from 'src/modules/users/infra/gateway/user-auth/users-auth.interface';
import { generatePassword } from 'src/shared/utils/generateInitialPassword';
import { HashUtil } from 'src/shared/utils/Hash.util';
import { WelcomePlatformUseCase } from 'src/modules/mail/domains/user/welcome-platform.use-case';

@Injectable()
export class CreateProfessionalUseCase {
  constructor(
    @Inject('UsersGatewayInterface')
    private readonly usersGateway: UsersGatewayInterface,
    @Inject('ProfessionalAttributesGatewayInterface')
    private readonly professionalAttributesGateway: ProfessionalAttributesGatewayInterface,
    @Inject('UsersAuthGatewayInterface')
    private readonly userAuthGateway: UsersAuthGatewayInterface,
    private readonly welcomePlatformUseCase: WelcomePlatformUseCase,
  ) {}

  async execute(data: CreateProfessionalDto) {
    const userCreated = await this.usersGateway.create(data);

    const professionalAttributesCreated =
      await this.professionalAttributesGateway.create({
        userId: userCreated.id,
        certificateType: data.certificateType,
        certificateNumber: data.certificateNumber,
      });

    const password = this.generateProfissionalPassword(data);

    await this.userAuthGateway.create({
      userId: userCreated.id,
      passwordHash: await this.generatePasswordHash(password),
    });

    await this.welcomePlatformUseCase.execute(userCreated, password);

    return this.outputMapper(userCreated, professionalAttributesCreated);
  }

  private generateProfissionalPassword(data: CreateProfessionalDto) {
    return generatePassword(data.document, data.name, data.email);
  }

  private async generatePasswordHash(password: string) {
    return HashUtil.hash(password);
  }

  private outputMapper(
    user: User,
    professionalAttributes: ProfessionalAttributes,
  ) {
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        professionalAttributes: {
          certificateType: professionalAttributes.certificateType,
          certificateNumber: professionalAttributes.certificateNumber,
        },
      },
    };
  }
}
