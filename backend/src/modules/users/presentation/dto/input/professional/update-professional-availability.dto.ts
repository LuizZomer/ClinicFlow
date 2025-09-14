import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { AvailabilityDto } from './availability.dto';

export class UpdateAvailabilityDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilityDto)
  availability: AvailabilityDto[];
}
