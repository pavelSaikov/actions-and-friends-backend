import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActionSchema, Action } from '../action/schemas';
import { User, UserSchema } from '../user/schemas';
import { ActionService } from '../action/action.service';
import { UserService } from '../user/user.service';
import { Friendship, FriendshipSchema } from '../friends/schemas';
import { FriendsService } from '../friends/friends.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Action.name, schema: ActionSchema },
      { name: Friendship.name, schema: FriendshipSchema },
    ]),
  ],
  exports: [UserService, ActionService, FriendsService],
  providers: [UserService, ActionService, FriendsService],
})
export class DatabaseModule {}
