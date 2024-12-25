import { HrDepartment } from 'src/hr/entity/hr-department.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ database: 'postgress' })
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @Column('text')
  responsibilities: string;

  @Column('text')
  requirements: string;

  @OneToMany(() => HrDepartment, (hrDepartment) => hrDepartment.position)
  employees: HrDepartment[];
}
