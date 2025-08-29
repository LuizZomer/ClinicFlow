import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/entities/user.entity';
import { FindUserAuthByUseCase } from 'src/modules/users-auth/domain/use-cases/find-user-auth-by.use-case';
import { FindOneByUseCase } from 'src/modules/users/domains/use-cases/find-one-by-id.use-case';
import { HashUtil } from 'src/shared/utils/Hash.util';

@Injectable()
export class JwtAuthUseCase {
  constructor(
    private jwtService: JwtService,
    private findOneUserByIdUseCase: FindOneByUseCase,
    private findUserAuthByUseCase: FindUserAuthByUseCase,
  ) {}

  async validateUser(document: string, pass: string): Promise<any> {
    const user = await this.findOneUserByIdUseCase.execute({ document });

    if (!user) return null;

    const userAuth = await this.findUserAuthByUseCase.execute({ id: user.id });
    if (!userAuth) return null;

    const isPasswordValid = await HashUtil.compare(pass, userAuth.passwordHash);
    if (!isPasswordValid) return null;

    return user;
  }

  login(user: User) {
    const payload = { document: user.document, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
