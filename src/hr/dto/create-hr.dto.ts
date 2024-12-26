import { ApiProperty } from '@nestjs/swagger';

export class CreateHrDto {
  @ApiProperty({
    description: 'Employee ID to be assigned to the position',
    example: 1,
  })
  employeeId: number;

  @ApiProperty({
    description: 'Position ID to be assigned to the employee',
    example: 1,
  })
  positionId: number;
}
