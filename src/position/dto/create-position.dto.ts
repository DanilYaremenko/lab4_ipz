import { ApiProperty } from '@nestjs/swagger';

export class CreatePositionDto {
  @ApiProperty({
    description: "Position's title",
    example: 'Senior Developer',
  })
  title: string;

  @ApiProperty({
    description: "Position's salary",
    example: 75000.0,
    type: 'number',
  })
  salary: number;

  @ApiProperty({
    description: "Position's responsibilities",
    example: 'Leading development team, code review, architecture design',
  })
  responsibilities: string;

  @ApiProperty({
    description: "Position's requirements",
    example: '5+ years experience, Bachelor degree in Computer Science',
  })
  requirements: string;
}
