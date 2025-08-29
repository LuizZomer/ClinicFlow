import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/core/entities/user.entity';
import { UsersGatewayInterface } from '../../infra/gateway/users-gateway.interface';

@Injectable()
export class FindOneByUseCase {
  constructor(
    @Inject('UsersGatewayInterface')
    private readonly usersGateway: UsersGatewayInterface,
  ) {}

  async execute(where: Partial<User>): Promise<User | null> {
    return this.usersGateway.findOneBy(where);
  }
}
