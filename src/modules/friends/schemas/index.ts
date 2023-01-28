import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { IFriendship } from '../dto';

export type FriendshipDocument = HydratedDocument<Friendship>;

@Schema()
export class Friendship implements Omit<IFriendship, 'id'> {
  @Prop()
  friendId: string;

  @Prop()
  userId: string;
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship);
