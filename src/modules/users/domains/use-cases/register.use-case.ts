import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UsersGatewayInterface } from '../../infra/gateway/users-gateway.interface';
import { User } from 'src/core/entities/user.entity';
import { UserAuth } from 'src/core/entities/user-auth.entity';
import { CreateUserAuthUseCase } from 'src/modules/users-auth/domain/use-cases/create-user-auth.use-case';
import { HashUtil } from 'src/shared/utils/Hash.util';
import { DataSource } from 'typeorm';
import { RegisterDto } from '../../presentation/dto/register.dto';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UsersGatewayInterface')
    private readonly usersGateway: UsersGatewayInterface,
    private readonly createUserAuthUseCase: CreateUserAuthUseCase,
    private readonly dataSource: DataSource,
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
