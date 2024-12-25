import { Injectable } from '@nestjs/common';
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

  async findAll(options: HrFilterOptions = {}): Promise<{ data: HrDepartment[]; total: number }> {
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
  }

  async findOne(id: number): Promise<HrDepartment> {
    return this.hrRepository.findOne({
      where: { id },
      relations: ['employee', 'position'],
    });
  }

  async create(createHrDto: Partial<HrDepartment>): Promise<HrDepartment> {
    const hr = this.hrRepository.create(createHrDto);
    return this.hrRepository.save(hr);
  }

  async update(id: number, updateHrDto: Partial<HrDepartment>): Promise<HrDepartment> {
    await this.hrRepository.update(id, updateHrDto);
    return this.hrRepository.findOne({
      where: { id },
      relations: ['employee', 'position'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.hrRepository.delete(id);
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
