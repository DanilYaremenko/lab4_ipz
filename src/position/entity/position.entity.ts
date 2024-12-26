import { HrDepartment } from 'src/hr/entity/hr-department.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ database: 'postgress' })
export class Position {
  @ApiProperty({ description: 'The unique identifier of the position' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The title of the position',
    example: 'Senior Developer',
  })
  @Column({ unique: true })
  title: string;

  @ApiProperty({
    description: 'The salary for the position',
    example: 75000.0,
    type: 'number',
  })
  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @ApiProperty({
    description: 'The responsibilities of the position',
    example: 'Leading development team, code review, architecture design',
  })
  @Column('text')
  responsibilities: string;

  @ApiProperty({
    description: 'The requirements for the position',
    example: '5+ years experience, Bachelor degree in Computer Science',
  })
  @Column('text')
  requirements: string;

  @ApiProperty({
    description: 'The employees assigned to this position',
    type: () => HrDepartment,
    isArray: true,
  })
  @OneToMany(() => HrDepartment, (hrDepartment) => hrDepartment.position)
  employees: HrDepartment[];
}
