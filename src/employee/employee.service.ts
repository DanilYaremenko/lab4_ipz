import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entity/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeeRepository.find();
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch employees: ${error.message}`,
      );
    }
  }

  async findOne(id: number): Promise<Employee> {
    try {
      const employee = await this.employeeRepository.findOne({ where: { id } });
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to fetch employee with ID ${id}: ${error.message}`,
      );
    }
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const employee = this.employeeRepository.create(createEmployeeDto);

      return await this.employeeRepository.save(employee);
    } catch (error) {
      throw new BadRequestException(
        `Failed to create employee: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    try {
      const employee = await this.findOne(id);
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
      await this.employeeRepository.update(id, updateEmployeeDto);

      return await this.employeeRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to update employee with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const employee = await this.findOne(id);
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      await this.employeeRepository.delete(id);

      return true;
    } catch (error) {
      throw new BadRequestException(
        `Failed to delete employee with ID ${id}: ${error.message}`,
      );
    }
  }
}
