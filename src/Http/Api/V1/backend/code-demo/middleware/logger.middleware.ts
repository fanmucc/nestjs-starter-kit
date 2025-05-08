import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../../../../../../common/services/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new LoggerService();

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';

    // 记录请求开始时间
    const startTime = Date.now();

    // 在响应结束时记录日志
    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      const { statusCode } = res;

      this.logger.log({
        method,
        url: originalUrl,
        statusCode,
        responseTime: `${responseTime}ms`,
        ip,
        userAgent,
      }, 'RequestLogger');
    });

    next();
  }
} 