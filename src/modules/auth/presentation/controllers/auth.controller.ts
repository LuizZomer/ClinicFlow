import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/shared/guards/local-auth.guard';
import { ReqWithUser } from 'src/shared/types/interface/reqWithUser.interface';
import { JwtAuthUseCase } from '../../domain/use-cases/jwt-auth.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtAuthUseCase: JwtAuthUseCase) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: ReqWithUser) {
    return this.jwtAuthUseCase.login(req.user);
  }
}
