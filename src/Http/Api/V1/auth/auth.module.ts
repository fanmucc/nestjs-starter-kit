import { Module, DynamicModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// jwt
import { JwtModule } from '@nestjs/jwt';
// 导入公共配置
import { ConfigModule, ConfigService } from '@nestjs/config';
// 导入策略
import { LocalStrategy } from './auth-strategy';
// 引入账号信息模块
import { AccountInfoModule } from '../backend/account-info/account-info.module';

//  // 配置jwt
//  const jwtModule = JwtModule.registerAsync({
//   global: true,
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: (configService: ConfigService) => ({
//     secret: configService.get(JWT_SECRET),
//     signOptions: { expiresIn: '1d' },
//   }),
// });

interface AuthModuleOptions {
  secret: string; // JWT 密钥
  expiresIn?: string; // JWT 过期时间
  moduleType: 'app' | 'backend'; // 模块类型
}

// {
//   imports: [jwtModule, AdminModule],
//   controllers: [AuthController],
//   providers: [AuthService],
// }
@Module({})
export class AuthModule {
  static registerAsync(options: Promise<AuthModuleOptions>): DynamicModule {
    return {
      module: AuthModule,
      imports: [JwtModule.registerAsync({
        global: true,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async () => {
          const resolvedOptions = await options;
          return {
            secret: resolvedOptions.secret,
            signOptions: { expiresIn: resolvedOptions.expiresIn },
          };
        },
      }), AccountInfoModule],
      controllers: [AuthController],
      providers: [AuthService, {
        provide: 'APP_TYPE',
        useFactory: async () => (await options).moduleType
      }, {
          provide: LocalStrategy,
          useFactory: async () => {
            const resolvedOptions = await options;
            return new LocalStrategy(resolvedOptions.secret);
          }
        }],
      exports: [AuthService, 'APP_TYPE']
    }
  }
}
