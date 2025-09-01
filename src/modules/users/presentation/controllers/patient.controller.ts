import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { RolesAllowed } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/types/enum/roles.enum';
import { RegisterResponseDto } from '../dto/output/register-response.dto';
import { GlobalErrorInterface } from 'src/shared/types/interface/errors/global-error.interface';
import { CreateUserDto } from '../dto/input/create-user.dto';
import { RegisterUseCase } from '../../domains/use-cases/user/register.use-case';

@Controller('patient')
export class PatientController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post()
  @RolesAllowed(Roles.OPERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new patient' })
  @ApiCreatedResponse({
    description: 'Patient created',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'User already exists',
    type: GlobalErrorInterface,
  })
  async createPatient(
    @Body() user: CreateUserDto,
  ): Promise<RegisterResponseDto> {
    const userCreated = await this.registerUseCase.execute(user, Roles.PATIENT);
    return {
      content: userCreated,
      status: HttpStatus.CREATED,
    };
  }
}
