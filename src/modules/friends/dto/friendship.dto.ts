import { IsString } from 'class-validator';

import { IFriendship } from './IFriendship';

export class FriendshipDto implements Omit<IFriendship, 'id'> {
  @IsString()
  userId: string;

  @IsString()
  friendId: string;
}
