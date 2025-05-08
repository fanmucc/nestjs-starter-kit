// decorators/company-self.decorator.ts
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { CompanySelfGuard } from '../guards/company-self.guard';
// import { AuthGuard } from '../guards/auth.guard'; // JWT等认证守卫
import { AuthJWTGuard } from '../guards/auth';
// import { ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

export function CompanySelf(field: string = 'id') {
  return applyDecorators(
    SetMetadata('roles', ['company']),
    SetMetadata('companyField', field),
    // 这里知道是雇主a
    // id = 138 别人公司发布的岗位
    // 检索一下id 138 是不你的发布的
    // 1. 是 就继续往下走 查看 删 改 
    // 2. 不是 提示 404 
    UseGuards(AuthJWTGuard, RolesGuard, CompanySelfGuard),
    // UseGuards(RolesGuard, CompanySelfGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: '未登录或 Token 无效' }),
    // ApiForbiddenResponse({ description: '无权操作该公司资源' })
  );
}