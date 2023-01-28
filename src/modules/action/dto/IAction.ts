import { Expose, Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

export interface IAction {
  id: string;
  actionName: string;
  completed: boolean;
  userId: string;
}

export class Action implements Omit<IAction, 'id'> {
  @Expose({ name: 'id' })
  @Type(() => String)
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Expose()
  actionName: string;

  @Expose()
  completed: boolean;

  @Expose()
  userId: string;

  id: string;
}
