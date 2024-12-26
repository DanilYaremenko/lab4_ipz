import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../common/gender.enum';
import { ContactType } from '../enum/contact-type.enum';

export class CreateClientDto {
  @ApiProperty({
    description: "Client's first name",
    example: 'Jane',
  })
  firstName: string;

  @ApiProperty({
    description: "Client's last name",
    example: 'Smith',
  })
  lastName: string;

  @ApiProperty({
    description: "Client's middle name",
    example: 'Marie',
  })
  middleName: string;

  @ApiProperty({
    description: "Client's age",
    example: 25,
  })
  age: number;

  @ApiProperty({
    description: "Client's gender",
    enum: Gender,
    example: Gender.FEMALE,
  })
  gender: Gender;

  @ApiProperty({
    description: "Client's contact type",
    enum: ContactType,
    example: ContactType.EMAIL,
  })
  contacts: ContactType;
}
