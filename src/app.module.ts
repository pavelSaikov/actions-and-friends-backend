import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  UserModule,
  ActionModule,
  FriendsModule,
  CommentsModule,
} from './modules';
import { ConfigKey } from './config';

@Module({
  imports: [
    UserModule,
    ActionModule,
    FriendsModule,
    CommentsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get(ConfigKey.MongoUrl),
          dbName: configService.get(ConfigKey.MongoDbName),
          authSource: configService.get(ConfigKey.MongoAuthSource),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
