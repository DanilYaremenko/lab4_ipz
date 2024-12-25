import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entity/position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async findAll(page = 1, limit = 10): Promise<{ data: Position[]; total: number }> {
    const [data, total] = await this.positionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async findOne(id: number): Promise<Position> {
    return this.positionRepository.findOne({ where: { id } });
  }

  async create(createPositionDto: Partial<Position>): Promise<Position> {
    const position = this.positionRepository.create(createPositionDto);
    return this.positionRepository.save(position);
  }

  async update(id: number, updatePositionDto: Partial<Position>): Promise<Position> {
    await this.positionRepository.update(id, updatePositionDto);
    return this.positionRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.positionRepository.delete(id);
  }
}
