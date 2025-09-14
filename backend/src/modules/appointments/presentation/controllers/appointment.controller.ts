import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
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
import { CancelAppointmentUseCase } from '../../domains/use-cases/cancel-appointment.use-case';
import { FindAllByUseCase } from '../../domains/use-cases/find-all-by.use-case';
import { Appointment } from 'src/core/entities/appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly cancelAppointmentUseCase: CancelAppointmentUseCase,
    private readonly findAllByUseCase: FindAllByUseCase,
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
    const appointmentCreated =
      await this.createAppointmentUseCase.execute(appointment);

    return {
      statusCode: HttpStatus.CREATED,
      content: appointmentCreated,
    };
  }

  @Patch(':id')
  // @ApiOperation({ summary: 'Cancel an appointment' })
  // @ApiCreatedResponse({
  //   description: 'Appointment canceled',
  //   type: AppointmentResponseDto,
  // })
  // @ApiUnauthorizedResponse({
  //   description: 'Unauthorized',
  //   type: GlobalErrorInterface,
  // })
  @RolesAllowed(Roles.OPERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async cancel(@Param('id') id: number) {
    await this.cancelAppointmentUseCase.execute(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Agendamento cancelado com sucesso!',
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: Partial<Appointment>) {
    const appointments = await this.findAllByUseCase.execute(query);
    return {
      statusCode: HttpStatus.OK,
      content: appointments,
    };
  }
}
