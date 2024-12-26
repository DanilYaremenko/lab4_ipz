import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HrService } from './hr.service';
import { HrDepartment } from './entity/hr-department.entity';
import { CreateHrDto } from './dto/create-hr.dto';
import { UpdateHrDto } from './dto/update-hr.dto';

@ApiTags('HR Department')
@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @ApiOperation({ summary: 'Get all HR records' })
  @ApiResponse({
    status: 200,
    description: 'Return all HR records',
    type: [HrDepartment],
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'positionId', required: false, type: Number })
  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('positionId') positionId?: number,
  ): Promise<{ data: HrDepartment[]; total: number }> {
    return this.hrService.findAll({ page, limit, positionId });
  }

  @ApiOperation({ summary: 'Get HR record by id' })
  @ApiResponse({
    status: 200,
    description: 'Return found HR record',
    type: HrDepartment,
  })
  @ApiResponse({ status: 404, description: 'HR record not found' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<HrDepartment> {
    return this.hrService.findOne(id);
  }

  @ApiOperation({ summary: 'Create new HR record' })
  @ApiResponse({
    status: 201,
    description: 'HR record successfully created',
    type: HrDepartment,
  })
  @Post()
  async create(@Body() createHrDto: CreateHrDto): Promise<HrDepartment> {
    return this.hrService.create(createHrDto);
  }

  @ApiOperation({ summary: 'Update HR record by id' })
  @ApiResponse({
    status: 200,
    description: 'HR record successfully updated',
    type: HrDepartment,
  })
  @ApiResponse({ status: 404, description: 'HR record not found' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateHrDto: UpdateHrDto,
  ): Promise<HrDepartment> {
    return this.hrService.update(id, updateHrDto);
  }

  @ApiOperation({ summary: 'Delete HR record by id' })
  @ApiResponse({ status: 200, description: 'HR record successfully deleted' })
  @ApiResponse({ status: 404, description: 'HR record not found' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.hrService.remove(id);
  }
}
