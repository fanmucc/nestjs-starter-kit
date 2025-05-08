import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // 获取装饰器存储的元数据
    // 使用 getAllAndOverride 方法获取角色要求
    // 这个方法会先检查方法级别（@Roles装饰器），再检查类级别
    // 返回找到的第一个有效值
    const requiredRoles = this.reflector.getAllAndOverride(Roles, [
      context.getHandler(), // 获取当前请求的处理方法
      context.getClass(), // 获取当前请求的控制器类
    ]);
    return true
    // 如果没有设置角色要求，允许访问
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 检查用户是否已登录
    if (!user) {
      throw new ForbiddenException('请先登录');
    }

    // 检查用户角色是否在允许的角色列表中
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException('您没有权限访问此资源');
    }

    return true;
  }
} 