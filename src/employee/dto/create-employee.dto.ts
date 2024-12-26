import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '../../common/gender.enum';
import { EmployeeStatus } from '../enum/employee-status.enum';
import { IsOptional } from 'class-validator';
import { StorageTypeEnum } from '../enum/storage-type.enum';
import { IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    description: "Employee's first name",
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: "Employee's last name",
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: "Employee's middle name",
    example: 'Robert',
  })
  middleName: string;

  @ApiProperty({
    description: "Employee's age",
    example: 30,
  })
  age: number;

  @ApiProperty({
    description: "Employee's gender",
    enum: Gender,
    example: Gender.MALE,
  })
  gender: Gender;

  @ApiProperty({
    description: "Employee's status",
    enum: EmployeeStatus,
    example: EmployeeStatus.ACTIVE,
    default: EmployeeStatus.ACTIVE,
  })
  status: EmployeeStatus;

  @ApiProperty({
    description: "Employee's profile image",
    type: 'string',
    format: 'binary',
    required: false,
  })
  image?: any;

  @ApiPropertyOptional({
    description: "Employee's storage type",
    enum: StorageTypeEnum,
    example: StorageTypeEnum.DATABASE,
  })
  @IsString()
  @IsOptional()
  storageType?: StorageTypeEnum;
}
