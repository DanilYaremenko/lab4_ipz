import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Gender } from '../../common/gender.enum';
import { EmployeeStatus } from '../enum/employee-status.enum';
import { HrDepartment } from '../../hr/entity/hr-department.entity';

@Entity({ database: 'postgress' })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  middleName: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  status: EmployeeStatus;

  @CreateDateColumn()
  hireDate: Date;

  @OneToMany(() => HrDepartment, (hrDepartment) => hrDepartment.employee)
  positions: HrDepartment[];
}
