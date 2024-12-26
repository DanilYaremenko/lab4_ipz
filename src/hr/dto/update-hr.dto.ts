import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateHrDto } from './create-hr.dto';

export class UpdateHrDto implements Partial<CreateHrDto> {
  @ApiPropertyOptional({
    description: 'Employee ID to be assigned to the position',
    example: 1,
  })
  employeeId?: number;

  @ApiPropertyOptional({
    description: 'Position ID to be assigned to the employee',
    example: 1,
  })
  positionId?: number;
}
