import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from '../../../../dto/backend/login/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async adminSignin(@Body() body: LoginAdminDto, @Req() req) {
    // 根据模块类型处理逻辑
    const moduleType = this.authService.getModuleType();
    // console.log(moduleType, '=====');
    return this.authService.adminSignin(body);
  }
}
