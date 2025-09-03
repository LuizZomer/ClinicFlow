import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RolesAllowed } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/types/enum/roles.enum';
import { GlobalErrorInterface } from 'src/shared/types/interface/errors/global-error.interface';
import { CreateAppointmentUseCase } from '../../domains/use-cases/create-appointment.use-case';
import { CreateAppointmentDto } from '../dto/input/create-appointment.dto';
import { AppointmentResponseDto } from '../dto/output/appointment-response.dto';

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
  async create(@Body() appointment: CreateAppointmentDto) {
    return this.createAppointmentUseCase.execute(appointment);
  }
}
