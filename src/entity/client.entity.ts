import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ContactType } from './enum/contact-type.enum';
import { Gender } from './enum/gender.enum';

@Entity({ database: 'mongodb' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  middleName: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  contacts: ContactType;
}
