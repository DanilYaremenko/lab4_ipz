import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { Position } from './entity/position.entity';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  async findAll(): Promise<Position[]> {
    return this.positionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Position> {
    return this.positionService.findOne(id);
  }

  @Post()
  async create(
    @Body() createPositionDto: Partial<Position>,
  ): Promise<Position> {
    return this.positionService.create(createPositionDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePositionDto: Partial<Position>,
  ): Promise<Position> {
    return this.positionService.update(id, updatePositionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.positionService.remove(id);
  }
}
