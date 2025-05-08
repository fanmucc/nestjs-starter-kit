import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { BusinessException } from '../exceptions-filters/exceptions/business.exception';
import { ErrorCode } from '../enums/error-code.enum';

export class AuthJWTGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    // 当出现错误、用户未验证或者无效 token 时
    if (err || !user) {
      // 自定义返回内容
      throw new BusinessException('登录信息已过期，请重新登录！', 401, null, HttpStatus.OK)
    }

    // 返回已验证的用户信息
    return user;
  }
}