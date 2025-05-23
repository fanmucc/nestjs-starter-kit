import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
// 引入jwt密钥
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../../../Enums/auth.enum';
// 引入全局返回模块
import { TransformInterceptor } from '../../../../interfaces/backend_response.interceptor';
// 引入异常返回模块
import { AllExceptionsFilter } from '../../../../exceptions-filters/all-exceptions.filter';
// 引入翻译拦截器
import { ResponseTranslationInterceptor } from '../../../../interfaces/response_translation.interceptor';

// 引入模块
import { CodeDemoModule } from './code-demo/code-demo.module';
// 登录
import { AuthModule } from '../auth/auth.module';
// 账号信息
import { AccountInfoModule } from './account-info/account-info.module';
// 职位
import { JobPositionsModule } from './job-positions/job-positions.module';

// 公共配置
@Module({
  imports: [
    AuthModule.registerAsync(
      new Promise(resolve => {
        const configService = new ConfigService();
        resolve({
          secret: configService.get(JWT_SECRET),
          expiresIn: configService.get(JWT_EXPIRES_IN),
          moduleType: 'backend',
        })
      })
    ),
    CodeDemoModule,
    AccountInfoModule,
    JobPositionsModule,
  ],
  controllers: [],
  providers: [
    // 拦截器是按照顺序进行执行的，这里先返回 数据格式 dto 然后再处理多语言
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTranslationInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})

export class BackendModule { }
