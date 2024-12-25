import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<{ data: Employee[]; total: number }> {
    return this.employeeService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Post()
  async create(@Body() createEmployeeDto: Partial<Employee>): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: Partial<Employee>,
  ): Promise<Employee> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.employeeService.remove(id);
  }
}
