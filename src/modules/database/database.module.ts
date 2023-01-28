import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActionSchema, Action } from '../action/schemas';
import { User, UserSchema } from '../user/schemas';
import { ActionService } from '../action/action.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Action.name, schema: ActionSchema }]),
  ],
  exports: [UserService, ActionService],
  providers: [UserService, ActionService],
})
export class DatabaseModule {}
