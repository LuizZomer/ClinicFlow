import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterUseCase } from '../../domains/use-cases/user/register.use-case';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { RegisterResponseDto } from '../dto/output/register-response.dto';
import { CreateUserDto } from '../dto/input/create-user.dto';
import { GlobalErrorInterface } from 'src/shared/types/interface/errors/global-error.interface';
import { RolesAllowed } from 'src/shared/decorators/roles.decorator';
import { Roles } from 'src/shared/types/enum/roles.enum';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('operator')
export class OperatorController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post()
  @RolesAllowed(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new operator' })
  @ApiCreatedResponse({
    description: 'Operator created',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'User already exists',
    type: GlobalErrorInterface,
  })
  async createOperator(
    @Body() user: CreateUserDto,
  ): Promise<RegisterResponseDto> {
    const userCreated = await this.registerUseCase.execute(user);
    return {
      content: userCreated,
      status: HttpStatus.CREATED,
    };
  }
}
