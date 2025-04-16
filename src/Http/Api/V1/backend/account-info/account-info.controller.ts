import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AccountInfoService } from './account-info.service';
import { CreateAccountInfoDto } from './dto/create-account-info.dto';
import { UpdateAccountInfoDto } from './dto/update-account-info.dto';
// 验证是否登录
import { AuthJWTGuard } from '../../../../../guards/auth';

@Controller()
@UseGuards(AuthJWTGuard)
export class AccountInfoController {
  constructor(private readonly accountInfoService: AccountInfoService) { }

  @Get()
  getUserInfo(@Req() req) {
    console.log(req.user, 'req.user');

    return {
      userName: req.user.name,
      userId: req.user.id,
      email: req.user.email,
    };
  }
}
