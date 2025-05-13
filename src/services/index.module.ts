// 统一引入独立服务，如 redis  email  prisma 等
import { Module } from '@nestjs/common';

// 引入prisma
import { PrismaModule } from '../database/prisma/prisma.module';
// 引入全局翻译模块
import { TranslationsModule } from '../translations/translations.module';
// 引入redis  
import { RedisModule } from './redis/redis.module';


@Module({
  imports: [
    PrismaModule,
    TranslationsModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ServicesModule { }