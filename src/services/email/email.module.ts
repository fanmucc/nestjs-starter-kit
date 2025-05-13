
import { Module, Global } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [],
  providers: [EmailService, ConfigService],
  exports: [EmailService],
})
export class EmailModule { }
