import { Gender } from 'src/common/gender.enum';
import { ContactType } from '../enum/contact-type.enum';

export interface ClientFilterOptions {
  page?: number;
  limit?: number;
  gender?: Gender;
  contactType?: ContactType;
  ageRange?: {
    min?: number;
    max?: number;
  };
  search?: string;
}
