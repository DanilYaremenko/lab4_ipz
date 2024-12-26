import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Response } from 'express';
import { ImageFileValidator } from '../common/image-file.validator';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new ImageFileValidator({
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
          }),
        ],
      }),
    )
    image: Express.Multer.File,
  ): Promise<Employee> {
    const parsedDto = {
      ...createEmployeeDto,
      age: parseInt(createEmployeeDto.age as any, 10),
      image,
    };

    return this.employeeService.create(parsedDto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new ImageFileValidator({
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
          }),
        ],
        fileIsRequired: false,
      }),
    )
    image?: Express.Multer.File,
  ): Promise<Employee> {
    const parsedDto = {
      ...updateEmployeeDto,
      age: updateEmployeeDto.age
        ? parseInt(updateEmployeeDto.age as any, 10)
        : undefined,
      image,
    };

    return this.employeeService.update(id, parsedDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.employeeService.remove(id);
  }

  @Get(':id/image')
  async getImage(@Param('id') id: number, @Res() res: Response) {
    const image = await this.employeeService.getImage(id);

    if (image.url) {
      return res.redirect(image.url);
    }

    if (image.buffer) {
      res.setHeader('Content-Type', 'image/jpeg');
      return res.send(image.buffer);
    }
  }
}
