import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateAppointmentUseCase } from '../../domains/use-cases/create-appointment.use-case';
import { CreateAppointmentDto } from '../dto/input/create-appointment.dto';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { User } from 'src/core/entities/user.entity';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { RolesAllowed } from 'src/shared/decorators/roles.decorator';
import { Roles } from 'src/shared/types/enum/roles.enum';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AppointmentResponseDto } from '../dto/output/appointment-response.dto';
import { GlobalErrorInterface } from 'src/shared/types/interface/errors/global-error.interface';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create an appointment' })
  @ApiCreatedResponse({
    description: 'Appointment created',
    type: AppointmentResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: GlobalErrorInterface,
  })
  @RolesAllowed(Roles.OPERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetUser() user: User,
    @Body() appointment: CreateAppointmentDto,
  ) {
    return this.createAppointmentUseCase.execute(appointment, user);
  }
}
