import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { User } from 'src/core/entities/user.entity';
import { UserAuth } from 'src/core/entities/user-auth.entity';
import { CreateUserAuthUseCase } from 'src/modules/users/domains/use-cases/user-auth/create-user-auth.use-case';
import { HashUtil } from 'src/shared/utils/Hash.util';
import { UsersGatewayInterface } from 'src/modules/users/infra/gateway/user/users-gateway.interface';
import { RegisterDto } from 'src/modules/users/presentation/dto/input/register.dto';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UsersGatewayInterface')
    private readonly usersGateway: UsersGatewayInterface,
    private readonly createUserAuthUseCase: CreateUserAuthUseCase,
  ) {}

  async execute(dto: RegisterDto): Promise<User> {
    const userCreated = await this.usersGateway.create(dto);

    await this.createUserAuth(dto.password, userCreated);

    return userCreated;
  }

  async createUserAuth(password: string, userCreated: User) {
    const userAuth = new UserAuth();
    userAuth.user = userCreated;
    userAuth.passwordHash = await HashUtil.hash(password);
    return this.createUserAuthUseCase.execute(userAuth);
  }
}
