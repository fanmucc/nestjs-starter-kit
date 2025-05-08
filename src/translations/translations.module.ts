import { Module, Global } from '@nestjs/common';
import { PrismaModule } from '../database/prisma/prisma.module';
import { TranslationsService } from './translations.service';
import { TranslationModel } from '../models/translation.model';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [TranslationsService, TranslationModel],
  exports: [TranslationsService, TranslationModel],
})
export class TranslationsModule { } 