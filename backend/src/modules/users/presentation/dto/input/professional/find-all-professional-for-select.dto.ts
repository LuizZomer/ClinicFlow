import { IsDateString } from 'class-validator';

export class FindAllProfessionalForSelectDto {
  @IsDateString()
  scheduledAt: Date;
}
