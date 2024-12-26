import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePositionDto } from './create-position.dto';

export class UpdatePositionDto implements Partial<CreatePositionDto> {
  @ApiPropertyOptional({
    description: "Position's title",
    example: 'Senior Developer',
  })
  title?: string;

  @ApiPropertyOptional({
    description: "Position's salary",
    example: 75000.0,
    type: 'number',
  })
  salary?: number;

  @ApiPropertyOptional({
    description: "Position's responsibilities",
    example: 'Leading development team, code review, architecture design',
  })
  responsibilities?: string;

  @ApiPropertyOptional({
    description: "Position's requirements",
    example: '5+ years experience, Bachelor degree in Computer Science',
  })
  requirements?: string;
}
