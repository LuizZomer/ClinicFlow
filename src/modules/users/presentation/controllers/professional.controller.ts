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
import { GlobalErrorInterface } from 'src/shared/types/interface/errors/global-error.interface';
import { CreateProfessionalUseCase } from '../../domains/use-cases/professional/create-professional.use-case';
import { CreateProfessionalDto } from '../dto/input/create-professional.dto';
import { RegisterResponseDto } from '../dto/output/register-response.dto';

@Controller('professional')
export class ProfessionalController {
  constructor(
    private readonly createProfessionalUseCase: CreateProfessionalUseCase,
  ) {}

  @Post()
  @RolesAllowed(Roles.OPERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new professional' })
  @ApiCreatedResponse({
    description: 'Professional created',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'User already exists',
    type: GlobalErrorInterface,
  })
  async createProfessional(@Body() user: CreateProfessionalDto) {
    const userCreated = await this.createProfessionalUseCase.execute(user);
    return {
      content: userCreated,
      status: HttpStatus.CREATED,
    };
  }
}
