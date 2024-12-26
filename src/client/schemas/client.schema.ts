import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../common/gender.enum';
import { ContactType } from '../enum/contact-type.enum';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true, versionKey: false })
export class Client {
  @ApiProperty({ description: "Client's first name", example: 'Jane' })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ description: "Client's last name", example: 'Smith' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ description: "Client's middle name", example: 'Marie' })
  @Prop({ required: true })
  middleName: string;

  @ApiProperty({ description: "Client's age", example: 25 })
  @Prop({ required: true })
  age: number;

  @ApiProperty({
    description: "Client's gender",
    enum: Gender,
    example: Gender.FEMALE,
  })
  @Prop({ required: true, enum: Gender })
  gender: Gender;

  @ApiProperty({
    description: "Client's contact type",
    enum: ContactType,
    example: ContactType.EMAIL, // Assuming EMAIL is one of the enum values
  })
  @Prop({ required: true, type: String, enum: ContactType })
  contacts: ContactType;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
