// guards/company-self.guard.ts
import { CanActivate, ExecutionContext, Injectable, ForbiddenException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CompanySelfGuard implements CanActivate {
  // 反射器
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // 从 AuthGuard 中来的
    const companyIdFromUser = user?.companyId;

    // 假设公司ID从路径参数中来：/companies/:id
    const companyIdFromParam = parseInt(request.params.id || request.body.id, 10);
    const field = this.reflector.get<string>('companyField', context.getHandler()) || 'id';
    // 获取目标公司ID
    const targetCompanyId = parseInt(request.params[field] || request.body[field], 10);

    if (!companyIdFromUser || !companyIdFromParam) {
      throw new ForbiddenException('公司信息不完整');
    }

    if (companyIdFromUser !== companyIdFromParam) {
      throw new ForbiddenException('不能操作非所属公司');
    }

    return true;
  }
}