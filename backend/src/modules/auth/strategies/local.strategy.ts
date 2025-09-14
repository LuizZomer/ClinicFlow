import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LocalAuthUseCase } from '../domain/use-cases/local-auth.use-case';
import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private localAuthUseCase: LocalAuthUseCase) {
    super({
      usernameField: 'document',
    });
  }

  async validate(document: string, password: string) {
    const user = await this.localAuthUseCase.authenticate(document, password);
    if (!user) throw new UnauthorizedException('Cpf ou senha inválidos');
    return user;
  }
}
