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
import { EventsService } from 'src/events/events.service';
import { Events } from 'src/events/enums/events.enum';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    private eventsService: EventsService,
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
      const newPosition = await this.positionRepository.save(position);

      this.eventsService.sendMessage(Events.dataCreated, {
        model: Position.name,
        data: newPosition,
      });

      return newPosition;
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

      const updatedPosition = await this.positionRepository.findOne({
        where: { id },
      });

      this.eventsService.sendMessage(Events.dataUpdated, {
        model: Position.name,
        data: updatedPosition,
      });

      return updatedPosition;
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

      this.eventsService.sendMessage(Events.dataDeleted, {
        model: Position.name,
        data: position,
      });

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to delete position with ID ${id}: ${error.message}`,
      );
    }
  }
}
