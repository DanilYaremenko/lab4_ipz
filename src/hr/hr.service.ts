import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HrDepartment } from './entity/hr-department.entity';
export interface HrFilterOptions {
  page?: number;
  limit?: number;
  positionId?: number;
}
@Injectable()
export class HrService {
  constructor(
    @InjectRepository(HrDepartment)
    private hrRepository: Repository<HrDepartment>,
  ) {}

  async findAll(
    options: HrFilterOptions = {},
  ): Promise<{ data: HrDepartment[]; total: number }> {
    try {
      const { page = 1, limit = 10, positionId } = options;
      const skip = (page - 1) * limit;

      const queryBuilder = this.hrRepository
        .createQueryBuilder('hr')
        .leftJoinAndSelect('hr.employee', 'employee')
        .leftJoinAndSelect('hr.position', 'position');

      if (positionId) {
        queryBuilder.where('position.id = :positionId', { positionId });
      }

      const [data, total] = await queryBuilder
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      return { data, total };
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch HR records: ${error.message}`,
      );
    }
  }

  async findOne(id: number): Promise<HrDepartment> {
    try {
      const hr = await this.hrRepository.findOne({
        where: { id },
        relations: ['employee', 'position'],
      });
      if (!hr) {
        throw new NotFoundException(`HR record with ID ${id} not found`);
      }
      return hr;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(`Failed to fetch HR record with ID ${id}`);
    }
  }

  async create(createHrDto: Partial<HrDepartment>): Promise<HrDepartment> {
    try {
      const hr = this.hrRepository.create(createHrDto);
      return await this.hrRepository.save(hr);
    } catch (error) {
      throw new BadRequestException(
        `Failed to create HR record: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updateHrDto: Partial<HrDepartment>,
  ): Promise<HrDepartment> {
    try {
      const hr = await this.findOne(id);

      if (!hr) {
        throw new NotFoundException(`HR record with ID ${id} not found`);
      }

      await this.hrRepository.update(id, updateHrDto);
      return await this.hrRepository.findOne({
        where: { id },
        relations: ['employee', 'position'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to update HR record with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const hr = await this.findOne(id);

      if (!hr) {
        throw new NotFoundException(`HR record with ID ${id} not found`);
      }

      await this.hrRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to delete HR record with ID ${id}: ${error.message}`,
      );
    }
  }

  async findByPosition(
    positionId: number,
    page = 1,
    limit = 10,
  ): Promise<{ data: HrDepartment[]; total: number }> {
    const [data, total] = await this.hrRepository.findAndCount({
      where: {
        position: { id: positionId },
      },
      relations: ['employee', 'position'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }
}
