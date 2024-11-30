import { Column } from 'typeorm';
import { Gender } from './gender.enum';

export class BaseUser {
  @Column()
  tin: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;
}
