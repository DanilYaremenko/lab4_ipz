import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdatePositionDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  salary?: number;

  @IsString()
  @IsOptional()
  responsibilities?: string;

  @IsString()
  @IsOptional()
  requirements?: string;
}
