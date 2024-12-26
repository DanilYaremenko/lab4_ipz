import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';
import { Gender } from '../../common/gender.enum';
import { ContactType } from '../enum/contact-type.enum';

export class UpdateClientDto implements Partial<CreateClientDto> {
  @ApiPropertyOptional({
    description: "Client's first name",
    example: 'Jane',
  })
  firstName?: string;

  @ApiPropertyOptional({
    description: "Client's last name",
    example: 'Smith',
  })
  lastName?: string;

  @ApiPropertyOptional({
    description: "Client's middle name",
    example: 'Marie',
  })
  middleName?: string;

  @ApiPropertyOptional({
    description: "Client's age",
    example: 25,
  })
  age?: number;

  @ApiPropertyOptional({
    description: "Client's gender",
    enum: Gender,
    example: Gender.FEMALE,
  })
  gender?: Gender;

  @ApiPropertyOptional({
    description: "Client's contact type",
    enum: ContactType,
    example: ContactType.EMAIL,
  })
  contacts?: ContactType;
}
