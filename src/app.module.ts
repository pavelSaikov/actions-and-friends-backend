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
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    UserModule,
    ActionModule,
    FriendsModule,
    CommentsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = {
          uri: configService.get(ConfigKey.MongoUrl),
          dbName: configService.get(ConfigKey.MongoDbName),
          authSource: configService.get(ConfigKey.MongoAuthSource),
        };

        return config;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
