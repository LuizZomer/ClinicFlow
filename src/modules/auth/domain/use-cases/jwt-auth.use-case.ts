import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/entities/user.entity';
import { FindUserAuthByUseCase } from 'src/modules/users/domains/use-cases/user-auth/find-user-auth-by.use-case';
import { FindUserOneByUseCase } from 'src/modules/users/domains/use-cases/user/find-one-by-id.use-case';
import { HashUtil } from 'src/shared/utils/Hash.util';

@Injectable()
export class JwtAuthUseCase {
  constructor(
    private jwtService: JwtService,
    private findOneUserByIdUseCase: FindUserOneByUseCase,
    private findUserAuthByUseCase: FindUserAuthByUseCase,
  ) {}

  async validateUser(document: string, pass: string): Promise<User | null> {
    const user = await this.findOneUserByIdUseCase.execute({ document });

    if (!user) return null;

    const userAuth = await this.findUserAuthByUseCase.execute({ id: user.id });
    if (!userAuth) return null;

    const isPasswordValid = await HashUtil.compare(pass, userAuth.passwordHash);
    if (!isPasswordValid) return null;

    console.log('userJWT', user);

    return user;
  }

  login(user: User) {
    const payload = { name: user.name, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
