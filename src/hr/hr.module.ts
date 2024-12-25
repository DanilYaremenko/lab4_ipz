import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrController } from './hr.controller';
import { HrService } from './hr.service';
import { HrDepartment } from './entity/hr-department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HrDepartment])],
  controllers: [HrController],
  providers: [HrService],
})
export class HrModule {}
