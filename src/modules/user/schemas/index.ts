import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  nickname: string;

  @Prop()
  password: string;

  @Prop()
  rate: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
