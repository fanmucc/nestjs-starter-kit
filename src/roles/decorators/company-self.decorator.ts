// decorators/company-self.decorator.ts
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../roles.guard';
import { CompanySelfGuard } from '../company-self.guard';
// import { AuthGuard } from '../guards/auth.guard'; // JWT等认证守卫
import { AuthJWTGuard } from '../../guards/auth';
// import { ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

export function CompanySelf(field: string = 'id') {
  return applyDecorators(
    SetMetadata('roles', ['company']),
    SetMetadata('companyField', field),
    UseGuards(AuthJWTGuard, RolesGuard, CompanySelfGuard),
    // UseGuards(RolesGuard, CompanySelfGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: '未登录或 Token 无效' }),
    // ApiForbiddenResponse({ description: '无权操作该公司资源' })
  );
}