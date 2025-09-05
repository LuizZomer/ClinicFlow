import { IsEnum, IsString } from 'class-validator';
import { DayOfWeek } from 'src/shared/types/enum/day-of-week.enum';

export class AvailabilityDto {
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @IsString()
  hour: string;
}
