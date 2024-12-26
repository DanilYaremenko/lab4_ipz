import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';
import { Gender } from '../../common/gender.enum';
import { EmployeeStatus } from '../enum/employee-status.enum';
import { StorageTypeEnum } from '../enum/storage-type.enum';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto implements Partial<CreateEmployeeDto> {
  @ApiPropertyOptional({
    description: "Employee's first name",
    example: 'John',
  })
  firstName?: string;

  @ApiPropertyOptional({
    description: "Employee's last name",
    example: 'Doe',
  })
  lastName?: string;

  @ApiPropertyOptional({
    description: "Employee's middle name",
    example: 'Robert',
  })
  middleName?: string;

  @ApiPropertyOptional({
    description: "Employee's age",
    example: 30,
  })
  age?: number;

  @ApiPropertyOptional({
    description: "Employee's gender",
    enum: Gender,
    example: Gender.MALE,
  })
  gender?: Gender;

  @ApiPropertyOptional({
    description: "Employee's status",
    enum: EmployeeStatus,
    example: EmployeeStatus.ACTIVE,
  })
  status?: EmployeeStatus;

  @ApiPropertyOptional({
    description: "Employee's storage type",
    enum: StorageTypeEnum,
    example: StorageTypeEnum.DATABASE,
  })
  @IsString()
  @IsOptional()
  storageType?: StorageTypeEnum;

  @ApiPropertyOptional({
    description: "Employee's profile image",
    type: 'string',
    format: 'binary',
  })
  image?: any;
}
