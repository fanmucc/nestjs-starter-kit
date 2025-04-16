import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class JobGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const jobId = request.params.id;
    
    // // 获取岗位信息
    // const job = await this.prisma.jobs.findUnique({
    //   where: { id: Number(jobId) },
    // });

    // if (!job) {
    //   return false;
    // }

    // // 如果是求职者，只能查看基础信息
    // if (user.role === 'job_seeker') {
    //   return true;
    // }

    // // 如果是企业用户
    // if (user.role === 'company') {
    //   // 检查是否是发布该岗位的企业
    //   return job.company_id === user.id;
    // }

    return false;
  }
} 