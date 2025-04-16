import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 开启跨域
  app.enableCors();

  // 从 process.env 中获取端口，因为 ConfigModule 已经加载了环境变量
  const port = process.env.APP_PORT || 3000;
  await app.listen(port);

  // 打印模块信息
  const server = app.getHttpAdapter();
  const routes = server.getHttpServer()._events.request._router.stack
    .filter((layer) => layer.route)
    .map((layer) => layer.route.path);

  console.log('Registered routes:', routes);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();
