import { Injectable } from '@nestjs/common';
import { TranslationModel } from '../models/translation.model';
// 数据库
import { PrismaService } from '../database/prisma/prisma.service';
@Injectable()
export class TranslationsService {
  constructor(private readonly translationModel: TranslationModel, private readonly prisma: PrismaService) { }

  // 获取实体的翻译
  async getTranslations(translationsWhere: {
    translatable_type: string,
    translatable_id: number,
    column: string,
    locale: string
  }[]) {
    // 提取所有不同的 translatable_type 用于分组查询
    const translationTypes = [...new Set(translationsWhere.map(t => t.translatable_type))];

    // 使用 groupBy 按类型和ID分组查询结果
    const results = await Promise.all(
      translationTypes.map(type => {
        // 过滤当前类型的所有条件
        const typeConditions = translationsWhere.filter(t => t.translatable_type === type);

        // 获取该类型下所有的 translatable_id
        const ids = [...new Set(typeConditions.map(t => t.translatable_id))];

        // 收集该类型和ID下所有需要的列和语言
        const columnLocales = typeConditions.map(t => ({
          column: t.column,
          locale: t.locale
        }));

        // 查询该类型下所有ID的翻译
        return this.prisma.translations.findMany({
          where: {
            translatable_type: type,
            translatable_id: {
              in: ids
            },
            OR: columnLocales
          },
          orderBy: {
            id: 'asc'
          }
        });
      })
    );

    // 扁平化结果数组
    return results.flat();
  }

  // 获取特定字段的翻译
  async getTranslation(translatableType: string, translatableId: number, column: string, locale: string) {
    return this.translationModel.getTranslation(translatableType, translatableId, column, locale);
  }

  // 创建或更新翻译
  async upsertTranslation(
    translatableType: string,
    translatableId: number,
    column: string,
    locale: string,
    value: string,
  ) {
    return this.translationModel.upsertTranslation(translatableType, translatableId, column, locale, value);
  }

  // 批量创建或更新翻译
  async upsertTranslations(
    translatableType: string,
    translatableId: number | bigint,
    translations: { column: string; locale: string; value: string }[],
  ) {
    const operations = translations.map(({ column, locale, value }) =>
      this.prisma.translations.upsert({
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
      })
    );
    return Promise.all(operations);
  }

  // 删除实体的所有翻译
  deleteTranslations(translatableType: string, translatableId: number) {
    this.prisma.translations.deleteMany({
      where: {
        translatable_type: translatableType,
        translatable_id: translatableId,
      },
    }).catch(err => {
      console.log(err, '==删除翻译失败==');
      // this.logger.warn(`删除翻译失败: ${err.message}`);
    })
  }

  // 批量删除翻译
  deleteTranslationsMany(translatableType: string, translatableIds: number[]) {
    this.prisma.translations.deleteMany({
      where: {
        translatable_type: translatableType,
        translatable_id: { in: translatableIds }
      },
    }).catch(err => {
      console.log(err, '==批量删除翻译失败==');
      // this.logger.warn(`批量删除翻译失败: ${err.message}`);
    })
  }

  // 删除特定字段的翻译
  async deleteTranslation(translatableType: string, translatableId: number, column: string, locale: string) {
    return this.translationModel.deleteTranslation(translatableType, translatableId, column, locale);
  }

  // 处理实体的翻译
  async handleEntityTranslations(
    translatableType: string,
    translatableId: number,
    data: Record<string, any>,
    locale: string,
  ) {
    const translations = Object.entries(data)
      .filter(([key, value]) => typeof value === 'string')
      .map(([column, value]) => ({
        column,
        locale,
        value,
      }));

    if (translations.length > 0) {
      await this.upsertTranslations(translatableType, translatableId, translations);
    }
  }


} 