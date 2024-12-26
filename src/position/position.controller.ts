import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PositionService } from './position.service';
import { Position } from './entity/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@ApiTags('Positions')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @ApiOperation({ summary: 'Get all positions' })
  @ApiResponse({
    status: 200,
    description: 'Return all positions',
    type: [Position],
  })
  @Get()
  async findAll(): Promise<Position[]> {
    return this.positionService.findAll();
  }

  @ApiOperation({ summary: 'Get position by id' })
  @ApiResponse({
    status: 200,
    description: 'Return found position',
    type: Position,
  })
  @ApiResponse({ status: 404, description: 'Position not found' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Position> {
    return this.positionService.findOne(id);
  }

  @ApiOperation({ summary: 'Create new position' })
  @ApiResponse({
    status: 201,
    description: 'Position successfully created',
    type: Position,
  })
  @Post()
  async create(
    @Body() createPositionDto: CreatePositionDto,
  ): Promise<Position> {
    return this.positionService.create(createPositionDto);
  }

  @ApiOperation({ summary: 'Update position by id' })
  @ApiResponse({
    status: 200,
    description: 'Position successfully updated',
    type: Position,
  })
  @ApiResponse({ status: 404, description: 'Position not found' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    return this.positionService.update(id, updatePositionDto);
  }

  @ApiOperation({ summary: 'Delete position by id' })
  @ApiResponse({ status: 200, description: 'Position successfully deleted' })
  @ApiResponse({ status: 404, description: 'Position not found' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.positionService.remove(id);
  }
}
