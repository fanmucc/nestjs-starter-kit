
import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';

import { ConfigModule, ConfigService } from '@nestjs/config';

// 全局模块
@Global()
@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [],
  providers: [RedisService, ConfigService],
  exports: [RedisService],
})

export class RedisModule { }
