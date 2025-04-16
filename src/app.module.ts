import * as dotenv from 'dotenv';
import { RouterModule } from '@nestjs/core';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 引入全局模块
import { PrismaModule } from './database/prisma/prisma.module';
// 登录登出模块
import { AuthModule } from './Http/Api/V1/auth/auth.module';
// 引入后端模块
import { BackendModule } from './Http/Api/V1/backend/index.module';
// 引入代码示例模块
import { CodeDemoModule } from './Http/Api/V1/backend/code-demo/code-demo.module';
// 引入账号信息模块
import { AccountInfoModule } from './Http/Api/V1/backend/account-info/account-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env',
      isGlobal: true,
      // 可以设置为默认加载的文件
      load: [() => dotenv.config({ path: '.env' })],
    }),
    // 引入数据库模块，全局引入，其他模块直接使用
    PrismaModule,
    BackendModule,
    // 处理路由模块
    RouterModule.register([
      {
        path: 'v1/backend',
        module: BackendModule,
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'account-info',
            module: AccountInfoModule,
          },
          {
            path: 'code-demo',
            module: CodeDemoModule,
          },

        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
