import { Module } from '@nestjs/common';
import { AccountInfoService } from './account-info.service';
import { AccountInfoController } from './account-info.controller';
import { PrismaModule } from '../../../../../database/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [AccountInfoController],
  providers: [AccountInfoService],
  exports: [AccountInfoService],
})
export class AccountInfoModule { }
