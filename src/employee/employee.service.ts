import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entity/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(page = 1, limit = 10): Promise<{ data: Employee[]; total: number }> {
    const [data, total] = await this.employeeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async create(createEmployeeDto: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async update(id: number, updateEmployeeDto: Partial<Employee>): Promise<Employee> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.employeeRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
