import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class LoginAdminDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  @MinLength(6)
  password: string;
}
