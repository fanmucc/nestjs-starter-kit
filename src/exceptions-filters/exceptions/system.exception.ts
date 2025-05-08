// src/exceptions/system.exception.ts
// 系统异常
import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class SystemException extends BaseException {
  constructor(
    message: string = 'Internal Server Error',
    code: number = HttpStatus.INTERNAL_SERVER_ERROR,
    data?: any
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, code, data);
  }
}