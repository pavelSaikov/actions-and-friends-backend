import { Module } from '@nestjs/common';

import { ActionController } from './action.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ActionController],
})
export class ActionModule {}
