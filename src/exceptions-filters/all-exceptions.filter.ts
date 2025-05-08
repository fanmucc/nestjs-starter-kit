// src/filters/all-exceptions.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BusinessException } from './exceptions/business.exception';
import { SystemException } from './exceptions/system.exception';
import { ErrorCode } from '../enums/error-code.enum';
import { LoggerService } from '../common/services/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new LoggerService();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = ErrorCode.SYSTEM_ERROR;
    let message = 'Internal server error';
    let data: any = null;
    // 处理已知异常
    if (exception instanceof BusinessException) {
      console.log(exception, '===exception===', exception.getStatus());
      status = exception.getStatus();  // 使用 getStatus() 方法
      code = exception.code;
      message = exception.message;
      data = exception.data ? exception.data : {
        message: exception.message,
        code: exception.code,
      };
    }
    // 处理系统异常
    else if (exception instanceof SystemException) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;  // 系统错误固定500
      code = exception.code;
      message = exception.message;
      data = exception.data;
    }
    // 处理 HTTP 异常
    else if (exception instanceof HttpException) {
      status = exception.getStatus();  // 使用HTTP异常自带的状态码
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exception.message;
        code = (exceptionResponse as any).code || status;
        data = (exceptionResponse as any).data || null;
      } else {
        message = exception.message;
        code = ErrorCode.SYSTEM_ERROR;
      }
    }
    // 处理未知异常
    else if (exception instanceof Error) {
      this.logger.error(exception.stack);
      status = HttpStatus.INTERNAL_SERVER_ERROR;  // 确保返回 500 状态码
      message = exception.message;
      code = ErrorCode.SYSTEM_ERROR;

      // 在生产环境中隐藏具体错误信息
      if (process.env.NODE_ENV === 'production') {
        message = 'Internal server error';
        data = null;
      } else {
        data = {
          stack: exception.stack,
          name: exception.name,
        };
      }
    }

    // 记录错误日志
    this.logger.error({
      path: request.url,
      method: request.method,
      code,
      message,
      stack: exception instanceof Error ? exception.stack : undefined,
    }, 'ExceptionFilter');

    // 返回统一的错误响应格式
    response.status(status).json({
      code,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
      },
    });
  }
}