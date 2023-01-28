import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';

import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendsController],
})
export class FriendsModule {}
