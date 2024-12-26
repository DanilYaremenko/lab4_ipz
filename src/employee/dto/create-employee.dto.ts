import {
  IsString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Gender } from '../../common/gender.enum';
import { EmployeeStatus } from '../enum/employee-status.enum';
import { StorageTypeEnum } from '../enum/storage-type.enum';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  middleName: string;

  @IsNumber()
  @Min(18)
  @Max(100)
  age: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;

  @IsOptional()
  image?: Express.Multer.File;

  @IsEnum(StorageTypeEnum)
  @IsOptional()
  storageType?: StorageTypeEnum = StorageTypeEnum.CLOUDINARY;
}
