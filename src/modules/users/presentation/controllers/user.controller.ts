import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUseCase } from '../../domains/use-cases/register.use-case';
import { RegisterDto } from '../dto/register.dto';

@Controller('users')
export class UserController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: RegisterDto) {
    const userCreated = await this.registerUseCase.execute(user);
    return {
      content: userCreated,
      status: HttpStatus.CREATED,
    };
  }
}
