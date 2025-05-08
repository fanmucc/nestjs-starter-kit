// 装饰器
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();

// 预定义的角色常量
export const ROLES = {
  ADMIN: 'admin',
  COMPANY: 'company',
  JOB_SEEKER: 'job_seeker',
} as const;

// 角色组合
export const ROLE_GROUPS = {
  ALL: [ROLES.ADMIN, ROLES.COMPANY, ROLES.JOB_SEEKER],
  COMPANY_AND_ADMIN: [ROLES.ADMIN, ROLES.COMPANY],
  JOB_SEEKER_AND_ADMIN: [ROLES.ADMIN, ROLES.JOB_SEEKER],
} as const; 