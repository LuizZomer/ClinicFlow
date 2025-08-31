import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUseCase } from '../../domains/use-cases/user/register.use-case';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { RegisterResponseDto } from '../dto/output/register-response.dto';
import { RegisterDto } from '../dto/input/register.dto';
import { GlobalErrorInterface } from 'src/shared/types/interface/errors/global-error.interface';

@Controller('users')
export class UserController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({
    description: 'User created',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'User already exists',
    type: GlobalErrorInterface,
  })
  async register(@Body() user: RegisterDto): Promise<RegisterResponseDto> {
    const userCreated = await this.registerUseCase.execute(user);
    return {
      content: userCreated,
      status: HttpStatus.CREATED,
    };
  }
}
