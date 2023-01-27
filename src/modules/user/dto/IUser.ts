import { Expose, Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

export interface IUser {
  id: string;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  password: string;
  rate: number;
}

export class UserDto implements Omit<IUser, 'password'> {
  @Expose({ name: 'id' })
  @Type(() => String)
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  surname: string;

  @Expose()
  nickname: string;

  @Expose()
  rate: number;

  id: string;
}
