import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CodeDemoService } from './code-demo.service';
import { CodeDemoController } from './code-demo.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  controllers: [CodeDemoController],
  providers: [CodeDemoService],
})
export class CodeDemoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('code-demo'); // 应用到所有 code-demo 路由
  }
}
