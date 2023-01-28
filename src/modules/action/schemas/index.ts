import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { IAction } from '../dto';

export type ActionDocument = HydratedDocument<Action>;

@Schema()
export class Action implements Omit<IAction, 'id'> {
  @Prop()
  actionName: string;

  @Prop()
  completed: boolean;

  @Prop()
  userId: string;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
