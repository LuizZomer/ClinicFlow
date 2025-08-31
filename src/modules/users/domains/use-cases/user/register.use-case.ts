import { Inject, Injectable } from '@nestjs/common';
import { UserAuth } from 'src/core/entities/user-auth.entity';
import { User } from 'src/core/entities/user.entity';
import { CreateUserAuthUseCase } from 'src/modules/users/domains/use-cases/user-auth/create-user-auth.use-case';
import { UsersGatewayInterface } from 'src/modules/users/infra/gateway/user/users-gateway.interface';
import { CreateUserDto } from 'src/modules/users/presentation/dto/input/create-user.dto';
import { RegisterResponseDto } from 'src/modules/users/presentation/dto/output/register-response.dto';
import { Roles } from 'src/shared/types/enum/roles.enum';
import { HashUtil } from 'src/shared/utils/Hash.util';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UsersGatewayInterface')
    private readonly usersGateway: UsersGatewayInterface,
    private readonly createUserAuthUseCase: CreateUserAuthUseCase,
  ) {}

  async execute(dto: CreateUserDto): Promise<RegisterResponseDto['content']> {
    const userCreated = await this.usersGateway.create({
      ...dto,
      role: Roles.OPERATOR,
    });

    await this.createUserAuth(dto.password, userCreated);

    return this.outputMapper(userCreated);
  }

  async createUserAuth(password: string, userCreated: User) {
    const userAuth = new UserAuth({
      userId: userCreated.id,
      passwordHash: await HashUtil.hash(password),
    });
    return this.createUserAuthUseCase.execute(userAuth);
  }

  private outputMapper(user: User): RegisterResponseDto['content'] {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
