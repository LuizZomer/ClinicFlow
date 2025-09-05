import { IsOptional, IsString } from 'class-validator';

export class FindAllByUseCaseDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  certificateType?: string;

  @IsOptional()
  @IsString()
  certificateNumber?: string;
}
