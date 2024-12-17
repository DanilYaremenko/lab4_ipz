import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Position } from './position.entity';

@Entity({ database: 'postgress' })
export class HrDepartment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.positions)
  @JoinColumn()
  employee: Employee;

  @ManyToOne(() => Position, (position) => position.employees)
  @JoinColumn()
  position: Position;

  @CreateDateColumn()
  assignmentDate: Date;
}
