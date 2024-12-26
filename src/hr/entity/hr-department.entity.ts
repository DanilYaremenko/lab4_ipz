import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employee/entity/employee.entity';
import { Position } from '../../position/entity/position.entity';

@Entity({ database: 'postgress' })
export class HrDepartment {
  @ApiProperty({
    description: 'The unique identifier of the HR department record',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The employee assigned to the position',
    type: () => Employee,
  })
  @ManyToOne(() => Employee, (employee) => employee.positions)
  @JoinColumn()
  employee: Employee;

  @ApiProperty({
    description: 'The position assigned to the employee',
    type: () => Position,
  })
  @ManyToOne(() => Position, (position) => position.employees)
  @JoinColumn()
  position: Position;

  @ApiProperty({
    description: 'The date when the position was assigned to the employee',
    type: Date,
  })
  @CreateDateColumn()
  assignmentDate: Date;
}
