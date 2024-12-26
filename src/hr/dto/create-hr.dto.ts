import { IsNumber } from 'class-validator';

export class CreateHrDto {
  @IsNumber()
  employeeId: number;

  @IsNumber()
  positionId: number;
}
