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
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Events } from 'src/events/enums/events.enum';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private cloudinaryService: CloudinaryService,
    private eventsService: EventsService,
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
      const { image, storageType, ...employeeData } = createEmployeeDto;
      const employee = this.employeeRepository.create(employeeData);

      this.eventsService.sendMessage(Events.dataCreated, {
        model: Employee.name,
        data: employee,
      });

      if (image) {
        if (storageType === 'database') {
          employee.imageBlob = image.buffer;
        } else {
          employee.imageUrl = await this.cloudinaryService.uploadImage(image);
        }
      }

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
      const { image, storageType, ...employeeData } = updateEmployeeDto;

      if (image) {
        if (storageType === 'database') {
          employee.imageBlob = image.buffer;
          employee.imageUrl = null;
        } else {
          const imageUrl = await this.cloudinaryService.uploadImage(image);
          employee.imageUrl = imageUrl;
          employee.imageBlob = null;
        }
      }

      const updatedEmployee = await this.employeeRepository.save({
        ...employee,
        ...employeeData,
      });

      this.eventsService.sendMessage(Events.dataUpdated, {
        model: Employee.name,
        data: updatedEmployee,
      });

      return updatedEmployee;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
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

      this.eventsService.sendMessage(Events.dataDeleted, {
        model: Employee.name,
        data: employee,
      });

      return true;
    } catch (error) {
      throw new BadRequestException(
        `Failed to delete employee with ID ${id}: ${error.message}`,
      );
    }
  }

  async getImage(id: number): Promise<{ buffer?: Buffer; url?: string }> {
    try {
      const employee = await this.findOne(id);

      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      if (employee.imageBlob) {
        return { buffer: employee.imageBlob };
      }

      if (employee.imageUrl) {
        return { url: employee.imageUrl };
      }

      throw new NotFoundException(`No image found for employee with ID ${id}`);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to fetch image for employee with ID ${id}: ${error.message}`,
      );
    }
  }
}
