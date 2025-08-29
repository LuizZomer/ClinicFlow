import { Inject, Injectable } from '@nestjs/common';
import { UsersAuthInterface } from '../../infra/gateways/users-auth.interface';
import { UserAuth } from 'src/core/entities/user-auth.entity';

@Injectable()
export class CreateUserAuthUseCase {
  constructor(
    @Inject('UsersAuthInterface')
    private readonly usersAuthGateway: UsersAuthInterface,
  ) {}

  async execute(userAuth: Partial<UserAuth>): Promise<UserAuth> {
    return this.usersAuthGateway.create(userAuth);
  }
}
