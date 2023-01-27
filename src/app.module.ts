import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ActionModule } from './action/action.module';
import { FriendsModule } from './friends/friends.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UserModule, ActionModule, FriendsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
