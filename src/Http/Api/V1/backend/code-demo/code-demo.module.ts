import { Module } from '@nestjs/common';
import { CodeDemoService } from './code-demo.service';
import { CodeDemoController } from './code-demo.controller';

@Module({
  controllers: [CodeDemoController],
  providers: [CodeDemoService],
})
export class CodeDemoModule {}
