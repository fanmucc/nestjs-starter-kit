import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

import { ConfigService } from '@nestjs/config';
import { AWS_SES_EMAIL } from '../../Enums/email.enum';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class EmailService {
  private sesClient: SESClient;

  constructor(private readonly configService: ConfigService) {
    this.sesClient = new SESClient({
      region: this.configService.get(AWS_SES_EMAIL.AWS_REGION), // 替换为您的 AWS 区域
      credentials: {
        accessKeyId: this.configService.get(AWS_SES_EMAIL.AWS_ACCESS_KEY_ID), // 从环境变量中读取
        secretAccessKey: this.configService.get(AWS_SES_EMAIL.AWS_SECRET_ACCESS_KEY), // 从环境变量中读取
      },
    });
  }


  async sendEmail(to: string, subject: string) {
    const fromEmail = this.configService.get(AWS_SES_EMAIL.AWS_SES_FROM_EMAIL); // 发送者邮箱 (必须经过 SES 验证)
    const fromName = this.configService.get(AWS_SES_EMAIL.AWS_SES_FROM_NAME);
    // 读取 HTML 模板
    // const templatePath = path.join(__dirname, '..', '..', 'public/templates/email/verification-email.html');
    const templatePath = path.resolve(process.cwd(), 'dist/public/templates/email/verification-email.html');
    const source = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(source);

    // 渲染 HTML 模板
    const html = template({ code: subject });

    // 配置邮件内容
    const params = {
      Source: `${fromName} <${fromEmail}>`,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: html,
          },
        },
      },
    };

    try {
      const command = new SendEmailCommand(params);
      const response = await this.sesClient.send(command);
      return {
        code: subject,
        message: '验证码发送成功',
      };
    } catch (error) {
      throw error;
    }
  }
}
