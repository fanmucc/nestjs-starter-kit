import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class TranslationModel {
  constructor(private readonly prisma: PrismaService) { }

  // 获取实体的翻译
  async getTranslations(translationsWhere: {
    translatable_type: string,
    translatable_id: number | bigint,
    column: string,
    locale: string
  }[]) {
    return this.prisma.translations.findMany({
      where: {
        OR: translationsWhere,
      },
    });
  }

  // 获取特定字段的翻译
  async getTranslation(translatableType: string, translatableId: number, column: string, locale: string) {
    return this.prisma.translations.findFirst({
      where: {
        translatable_type: translatableType,
        translatable_id: translatableId,
        column,
        locale,
      },
    });
  }

  // 创建或更新翻译
  async upsertTranslation(
    translatableType: string,
    translatableId: number,
    column: string,
    locale: string,
    value: string,
  ) {
    return this.prisma.translations.upsert({
      where: {
        translatable_type_translatable_id_locale_column: {
          translatable_type: translatableType,
          translatable_id: translatableId,
          locale,
          column,
        },
      },
      update: {
        value,
      },
      create: {
        translatable_type: translatableType,
        translatable_id: translatableId,
        column,
        locale,
        value,
      },
    });
  }

  // 批量创建或更新翻译
  async upsertTranslations(
    translatableType: string,
    translatableId: number,
    translations: { column: string; locale: string; value: string }[],
  ) {
    const operations = translations.map(({ column, locale, value }) =>
      this.upsertTranslation(translatableType, translatableId, column, locale, value),
    );
    return Promise.all(operations);
  }

  // 删除实体的所有翻译
  async deleteTranslations(translatableType: string, translatableId: number) {
    return this.prisma.translations.deleteMany({
      where: {
        translatable_type: translatableType,
        translatable_id: translatableId,
      },
    });
  }

  // 删除特定字段的翻译
  async deleteTranslation(translatableType: string, translatableId: number, column: string, locale: string) {
    return this.prisma.translations.delete({
      where: {
        translatable_type_translatable_id_locale_column: {
          translatable_type: translatableType,
          translatable_id: translatableId,
          locale,
          column,
        },
      },
    });
  }
} 