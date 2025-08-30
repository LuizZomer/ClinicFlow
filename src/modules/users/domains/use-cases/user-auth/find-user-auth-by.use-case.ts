import { Injectable } from '@nestjs/common';
import { UserAuth } from 'src/core/entities/user-auth.entity';
import { Inject } from '@nestjs/common';
import { UsersAuthInterface } from '../../../infra/gateway/user-auth/users-auth.interface';

@Injectable()
export class FindUserAuthByUseCase {
  constructor(
    @Inject('UsersAuthInterface')
    private readonly usersAuthGateway: UsersAuthInterface,
  ) {}

  async execute(where: Partial<UserAuth>): Promise<UserAuth | null> {
    return this.usersAuthGateway.findOneBy(where);
  }
}
