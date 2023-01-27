import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from './config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return this.configService.get(ConfigKey.MongoUrl);
  }
}
