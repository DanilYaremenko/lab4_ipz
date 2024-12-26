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
import { HrService } from './hr.service';
import { HrDepartment } from './entity/hr-department.entity';
import { CreateHrDto } from './dto/create-hr.dto';
import { UpdateHrDto } from './dto/update-hr.dto';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('positionId') positionId?: number,
  ): Promise<{ data: HrDepartment[]; total: number }> {
    return this.hrService.findAll({ page, limit, positionId });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<HrDepartment> {
    return this.hrService.findOne(id);
  }

  @Post()
  async create(@Body() createHrDto: CreateHrDto): Promise<HrDepartment> {
    return this.hrService.create(createHrDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateHrDto: UpdateHrDto,
  ): Promise<HrDepartment> {
    return this.hrService.update(id, updateHrDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.hrService.remove(id);
  }
}
