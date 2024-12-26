import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entity/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async findAll(): Promise<Position[]> {
    try {
      return await this.positionRepository.find();
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch positions: ${error.message}`,
      );
    }
  }

  async findOne(id: number): Promise<Position> {
    try {
      const position = await this.positionRepository.findOne({ where: { id } });
      if (!position) {
        throw new NotFoundException(`Position with ID ${id} not found`);
      }
      return position;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(`Failed to fetch position with ID ${id}`);
    }
  }

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    try {
      const position = this.positionRepository.create(createPositionDto);
      return await this.positionRepository.save(position);
    } catch (error) {
      throw new BadRequestException(
        `Failed to create position: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    try {
      const position = await this.findOne(id);

      if (!position) {
        throw new NotFoundException(`Position with ID ${id} not found`);
      }

      await this.positionRepository.update(id, updatePositionDto);
      return await this.positionRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to update position with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const position = await this.findOne(id);

      if (!position) {
        throw new NotFoundException(`Position with ID ${id} not found`);
      }

      await this.positionRepository.delete(id);

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to delete position with ID ${id}: ${error.message}`,
      );
    }
  }
}
