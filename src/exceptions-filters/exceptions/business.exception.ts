// src/exceptions/business.exception.ts
// 业务异常
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../../enums/error-code.enum';

export class BusinessException extends HttpException {
  constructor(
    message: string,
    public readonly code: ErrorCode,
    public readonly data?: any,
    status: HttpStatus = HttpStatus.OK
  ) {
    super({ message, code, data }, status);
  }
}