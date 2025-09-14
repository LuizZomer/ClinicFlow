import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
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
import { CreateProfessionalDto } from '../dto/input/professional/create-professional.dto';
import { RegisterResponseDto } from '../dto/output/register-response.dto';
import { UpdateAvailabilityDto } from '../dto/input/professional/update-professional-availability.dto';
import { CreateProfessionalAvailiableUseCase } from '../../domains/use-cases/professional/create-professional-availiable.use-case';
import { FindAllByUseCaseDto } from '../dto/input/professional/find-all-by.use-case';
import { FindAllProfessionalByUseCase } from '../../domains/use-cases/professional/find-all-by.use-case';
import { FindAllByScheduledAtForSelectUseCase } from '../../domains/use-cases/professional/find-all-by-scheduled-at-for-select.use-case';
import { FindAllProfessionalForSelectDto } from '../dto/input/professional/find-all-professional-for-select.dto';

@Controller('professional')
export class ProfessionalController {
  constructor(
    private readonly createProfessionalUseCase: CreateProfessionalUseCase,
    private readonly createProfessionalAvailiableUseCase: CreateProfessionalAvailiableUseCase,
    private readonly findAllProfessionalByUseCase: FindAllProfessionalByUseCase,
    private readonly findAllByScheduledAtForSelectUseCase: FindAllByScheduledAtForSelectUseCase,
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

  @Put(':id/availability')
  @RolesAllowed(Roles.OPERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update professional availability' })
  // @ApiCreatedResponse({
  //   description: 'Professional availability updated',
  //   type: RegisterResponseDto,
  // })
  // @ApiBadRequestResponse({
  //   description: 'User already exists',
  //   type: GlobalErrorInterface,
  // })
  async updateProfessionalAvailability(
    @Body() availability: UpdateAvailabilityDto,
    @Param('id') professionalId: string,
  ) {
    const userCreated = await this.createProfessionalAvailiableUseCase.execute(
      Number(professionalId),
      availability,
    );

    return {
      content: userCreated,
      status: HttpStatus.OK,
    };
  }

  @Get()
  @RolesAllowed(Roles.OPERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all professionals' })
  // @ApiCreatedResponse({
  //   description: 'Professional availability updated',
  //   type: RegisterResponseDto,
  // })
  // @ApiBadRequestResponse({
  //   description: 'User already exists',
  //   type: GlobalErrorInterface,
  // })
  async findAllProfessional(@Query() query: FindAllByUseCaseDto) {
    const professionals =
      await this.findAllProfessionalByUseCase.execute(query);

    return {
      content: professionals,
      status: HttpStatus.OK,
    };
  }

  @Get('for-select')
  @RolesAllowed(Roles.OPERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all professionals for select' })
  // @ApiCreatedResponse({
  //   description: 'Professional availability updated',
  //   type: RegisterResponseDto,
  // })
  // @ApiBadRequestResponse({
  //   description: 'User already exists',
  //   type: GlobalErrorInterface,
  // })
  async findAllProfessionalForSelect(
    @Query() { scheduledAt }: FindAllProfessionalForSelectDto,
  ) {
    const professionals =
      await this.findAllByScheduledAtForSelectUseCase.execute(scheduledAt);

    return {
      content: professionals,
      status: HttpStatus.OK,
    };
  }
}
