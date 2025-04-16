import { Injectable, HttpException, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginAdminDto } from '../../../../../dto/backend/login/login.dto';
import { PrismaService } from '../../../../../database/prisma/prisma.service';

// 解密
import { hash, compare } from "bcryptjs";
import { plainToInstance } from 'class-transformer';
import { ResponseAccountInfoDto } from '../../../../../dto/backend/account-info/response.dto';
@Injectable()
export class AccountInfoService {
  constructor(private readonly prisma: PrismaService) { }
  async signin(body: LoginAdminDto) {
    const admin = await this.prisma.admins.findUnique({ where: { email: body.email } });
    if (!admin) {
      // throw new HttpException({ code: 400, msg: '用户不存在' }, HttpStatus.OK);
      throw new NotFoundException(`邮箱 ${body.email} 用户不存在`);
    }
    // 解析密码
    const isPasswordValid = await compare(body.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('账号密码错误');
    }
    // 返回内容
    return plainToInstance(ResponseAccountInfoDto, admin, { excludeExtraneousValues: true });
  }
}
