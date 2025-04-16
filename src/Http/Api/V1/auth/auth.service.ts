import { Injectable, Inject } from '@nestjs/common';
import { LoginAdminDto } from '../../../../dto/backend/login/login.dto';
import { AccountInfoService } from '../backend/account-info/account-info.service';
// jwt
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly accountInfoService: AccountInfoService) { }
  @Inject(JwtService)
  private readonly jwt: JwtService
  @Inject('APP_TYPE')
  private readonly moduleType: 'backend' | 'app'
  // 管理端登录
  async adminSignin(body: LoginAdminDto) {
    const accountInfo = await this.accountInfoService.signin(body);
    return {
      token: this.jwt.sign({
        ...accountInfo,
      })
    }
  }
  // 区分模块逻辑
  getModuleType(): string {
    return this.moduleType;
  }
}
