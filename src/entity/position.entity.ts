import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HrDepartment } from './hr-department.entity';

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
