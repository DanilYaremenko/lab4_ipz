import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Gender } from '../../common/gender.enum';
import { ContactType } from '../enum/contact-type.enum';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(150)
  age?: number;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsEnum(ContactType)
  @IsOptional()
  contacts?: ContactType;
}
