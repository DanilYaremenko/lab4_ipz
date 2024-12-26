import {
  IsString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';
import { Gender } from '../../common/gender.enum';
import { ContactType } from '../enum/contact-type.enum';

export class CreateClientDto {
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
  @Min(0)
  @Max(150)
  age: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(ContactType)
  contacts: ContactType;
}
