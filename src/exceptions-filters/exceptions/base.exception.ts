// src/exceptions/base.exception.ts
// 公共基础异常
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    public readonly code: number,
    public readonly data?: any
  ) {
    super(
      {
        message,
        code,
        data,
      },
      status
    );
  }
}