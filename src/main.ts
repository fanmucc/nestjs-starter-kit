import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BusinessException } from './exceptions-filters/exceptions/business.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 开启跨域
  app.enableCors();

  // 添加全局管道 自动转化dto参数
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 启用自动转换
      transformOptions: {
        enableImplicitConversion: true, // 启用隐式转换
      },
      //只接受DTO中定义的属性，忽略其他属性
      whitelist: true,
      //如果数据验证失败，则抛出异常，并返回400状态码
      forbidNonWhitelisted: false,
      // 自定义返回值，强制返回200状态码 使用自定以错误提示，原因：dto验证错误为已知错误，可预料。
      exceptionFactory: (errors) => {
        const messages = errors.map(error => {
          const constraints = error.constraints;
          return Object.values(constraints).join(', ');
        });
        return new BusinessException(
          messages.join('; '),
          400,
        );
      },
    }),
  );

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
