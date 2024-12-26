import {
  IsString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';
import { Gender } from '../../common/gender.enum';
import { EmployeeStatus } from '../enum/employee-status.enum';

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
}
