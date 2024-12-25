import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../../common/gender.enum';
import { ContactType } from '../enum/contact-type.enum';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  middleName: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, enum: Gender })
  gender: Gender;

  @Prop({ required: true, type: String, enum: ContactType })
  contacts: ContactType;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
