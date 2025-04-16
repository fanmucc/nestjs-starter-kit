import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(protected secret: string) {
    super({
      // 从请求头中提取token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 忽略过期时间
      ignoreExpiration: false,
      // 秘钥
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
