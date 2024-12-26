import { IsNumber, IsOptional } from 'class-validator';

export class UpdateHrDto {
  @IsNumber()
  @IsOptional()
  employeeId?: number;

  @IsNumber()
  @IsOptional()
  positionId?: number;
}
