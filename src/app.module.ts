import * as dotenv from 'dotenv';
import { RouterModule } from '@nestjs/core';

import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 引入全局模块
import { PrismaModule } from './database/prisma/prisma.module';
// 全局翻译模块
import { TranslationsModule } from './translations/translations.module';
// 登录登出模块
import { AuthModule } from './Http/Api/V1/auth/auth.module';
// 引入后端模块
import { BackendModule } from './Http/Api/V1/backend/index.module';
// 引入代码示例模块
import { CodeDemoModule } from './Http/Api/V1/backend/code-demo/code-demo.module';
// 引入职位模块
import { JobPositionsModule } from './Http/Api/V1/backend/job-positions/job-positions.module';

// 引入账号信息模块
import { AccountInfoModule } from './Http/Api/V1/backend/account-info/account-info.module';
import { I18nModule, HeaderResolver } from 'nestjs-i18n';
import * as path from 'path';
import { BaseFilter } from './modelFilters/BaseFilter';

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
          {
            path: 'job-positions',
            module: JobPositionsModule,
          },

        ],
      },
    ]),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        // 解析请求头中的语言
        new HeaderResolver(['accept-language']),
      ],
    }),
    TranslationsModule,
    JobPositionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private configService: ConfigService) { }

  onModuleInit() {
    // 设置 BaseFilter 的 ConfigService
    BaseFilter.setConfigService(this.configService);
  }
}
