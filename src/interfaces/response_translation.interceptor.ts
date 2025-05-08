import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  SetMetadata,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { TranslationsService } from '../translations/translations.service';
import { LoggerService } from '../common/services/logger.service';

export const RESPONSE_TRANSLATION_KEY = 'response_translation';

interface TranslationConfig {
  type: string;  // 翻译类型
  fields: string[];  // 需要翻译的字段
}

export function ResponseTranslation(config: TranslationConfig) {
  return SetMetadata(RESPONSE_TRANSLATION_KEY, config);
}

@Injectable()
export class ResponseTranslationInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private translationService: TranslationsService
  ) { }
  // 日志
  private readonly logger = new LoggerService();
  // 收集需要翻译的值
  private collectTranslationValues(data: any, fields: string[]): Array<{
    translatable_id: number;
    locale: string;
    column: string;
  }> {
    // 使用数组而不是 Set，避免对象引用比较问题
    const values: Array<{
      translatable_id: number;
      locale: string;
      column: string;
    }> = [];

    // 辅助函数：添加翻译值
    const addTranslationValue = (id: number, field: string) => {
      // 添加英文翻译
      values.push({
        translatable_id: id,
        locale: 'en',
        column: field,
      });
      // 添加中文翻译
      values.push({
        translatable_id: id,
        locale: 'zh_CN',
        column: field,
      });
    };

    const collect = (obj: any) => {
      // 基础验证
      if (!obj || typeof obj !== 'object') return;

      if (Array.isArray(obj)) {
        // 处理数组
        obj.forEach(item => collect(item));
        return;
      }

      // 对象必须有 id 才能处理
      if (!obj.id) return;

      // 处理每个需要翻译的字段
      fields.forEach(field => {
        // 处理嵌套字段 (例如: parent_name)
        if (field.includes('_')) {
          const [parentKey, childField] = field.split('_');
          const parentObj = obj[parentKey];

          // 父对象必须存在且有 id 才能处理
          if (parentObj && typeof parentObj === 'object' && parentObj.id && parentObj[childField]) {
            addTranslationValue(parentObj.id, childField);
          }
        }
        // 处理直接字段
        else if (obj[field]) {
          addTranslationValue(obj.id, field);
        }
      });

      // 递归处理所有嵌套对象
      Object.entries(obj).forEach(([key, value]) => {
        // 跳过 id 和 null/undefined 值
        if (key !== 'id' && value && typeof value === 'object') {
          collect(value);
        }
      });
    };

    collect(data);
    return values;
  }

  // 应用翻译
  private applyTranslations(data: any, translations: Map<string, string>, fields: string[]): any {
    if (!data) return data;

    if (Array.isArray(data)) {
      return data.map(item => this.applyTranslations(item, translations, fields));
    }

    if (typeof data === 'object' && data.id) {
      const result = { ...data };

      // 处理每个字段
      fields.forEach(field => {
        // 处理嵌套字段 (例如: parent_name)
        if (field.includes('_')) {
          const [parentKey, childField] = field.split('_');
          const parentObj = result[parentKey];

          // 如果父对象存在且有ID
          if (parentObj && typeof parentObj === 'object' && parentObj.id) {
            // 尝试获取英文和中文翻译
            const enKey = `${parentObj.id}_${childField}_en`;
            const zhKey = `${parentObj.id}_${childField}_zh_CN`;

            // 确保字段存在，且不是已经转换过的多语言对象
            if (parentObj[childField] &&
              typeof parentObj[childField] === 'string' ||
              (typeof parentObj[childField] === 'object' && !parentObj[childField].hasOwnProperty('default'))) {

              // 确保我们处理的是原始值，不是已转换的对象
              const originalValue = typeof parentObj[childField] === 'object' ?
                JSON.stringify(parentObj[childField]) : parentObj[childField];

              // 如果有任一翻译，则创建新的格式
              if (translations.has(enKey) || translations.has(zhKey)) {
                // 创建新的翻译对象
                parentObj[childField] = {
                  default: originalValue,
                  en: translations.get(enKey) || originalValue,
                  zh_CN: translations.get(zhKey) || originalValue
                };
              }
            }
          }
        }
        // 处理直接字段
        else if (result[field]) {
          // 确保不是已经转换过的多语言对象
          if (typeof result[field] === 'string' ||
            (typeof result[field] === 'object' && !result[field].hasOwnProperty('default'))) {

            // 确保我们处理的是原始值，不是已转换的对象
            const originalValue = typeof result[field] === 'object' ?
              JSON.stringify(result[field]) : result[field];

            // 尝试获取英文和中文翻译
            const enKey = `${result.id}_${field}_en`;
            const zhKey = `${result.id}_${field}_zh_CN`;

            // 如果有任一翻译，则创建新的格式
            if (translations.has(enKey) || translations.has(zhKey)) {
              // 创建新的翻译对象
              result[field] = {
                default: originalValue,
                en: translations.get(enKey) || originalValue,
                zh_CN: translations.get(zhKey) || originalValue
              };
            }
          }
        }
      });

      // 递归处理嵌套对象（不处理已转换为翻译对象的字段）
      Object.entries(result).forEach(([key, value]) => {
        if (
          key !== 'id' &&
          value &&
          typeof value === 'object' &&
          !Array.isArray(value) &&
          !value.hasOwnProperty('default')
        ) {
          result[key] = this.applyTranslations(value, translations, fields);
        }
      });

      return result;
    }

    return data;
  }

  // 删除重复的翻译请求
  private removeDuplicateTranslations(translations: any[]): any[] {
    const uniqueMap = new Map();

    // 为每个翻译条目创建一个唯一键
    for (const translation of translations) {
      const key = `${translation.translatable_type}_${translation.translatable_id}_${translation.column}_${translation.locale}`;
      uniqueMap.set(key, translation);
    }

    // 返回去重后的数组
    return Array.from(uniqueMap.values());
  }

  // 构建翻译映射表，便于快速查找
  private buildTranslationsMap(translations: any[]): Map<string, string> {
    const translationsMap = new Map<string, string>();

    if (!translations || translations.length === 0) {
      return translationsMap;
    }

    // 遍历所有翻译，构建键值对
    translations.forEach(translation => {
      const key = `${translation.translatable_id}_${translation.column}_${translation.locale}`;
      translationsMap.set(key, translation.value);
    });

    return translationsMap;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    const translationConfig = this.reflector.get<TranslationConfig>(
      RESPONSE_TRANSLATION_KEY,
      handler,
    );

    return next.handle().pipe(
      map(data => {
        // 如果没有翻译配置或数据，直接返回
        if (!translationConfig || !data) {
          return data;
        }

        // 处理包含 data 和 meta 的返回结构
        if (data && data.hasOwnProperty('data') && data.hasOwnProperty('meta')) {
          // 这里返回一个带有then方法的Promise，确保异步操作完成后返回结果
          return this.processTranslation(data, translationConfig)
            .then(result => {
              // console.log('Translation completed, returning data');
              return result;
            })
            .catch(error => {
              this.logger.error('Error processing translation:', error);
              return data; // 出错时返回原始数据
            });
        }

        // 处理普通数据
        return this.processSimpleTranslation(data, translationConfig)
          .then(result => {
            return result;
          })
          .catch(error => {
            this.logger.error('Error processing simple translation:', error);
            return data; // 出错时返回原始数据
          });
      }),
    );
  }

  // 处理带有data和meta的复杂响应结构
  private async processTranslation(data: any, translationConfig: TranslationConfig): Promise<any> {
    const { data: items, meta } = data;

    // 收集所有需要翻译的值
    const valuesToTranslate = this.collectTranslationValues(items, translationConfig.fields);

    let translationsWhere = [];
    for (const value of valuesToTranslate) {
      translationsWhere.push({
        translatable_type: translationConfig.type,
        translatable_id: value.translatable_id,
        column: value.column,
        locale: value.locale,
      });
    }

    // 去重函数，移除完全相同的翻译请求
    const uniqueTranslationsWhere = this.removeDuplicateTranslations(translationsWhere);

    // 批量获取翻译
    const translations = await this.translationService.getTranslations(uniqueTranslationsWhere);

    // 将翻译结果转换为Map以便快速查找
    const translationsMap = this.buildTranslationsMap(translations);

    // 应用翻译
    const translatedData = this.applyTranslations(items, translationsMap, translationConfig.fields);

    return {
      ...data,
      data: translatedData
    };
  }

  // 处理普通响应结构
  private async processSimpleTranslation(data: any, translationConfig: TranslationConfig): Promise<any> {
    const valuesToTranslate = this.collectTranslationValues(data, translationConfig.fields);

    let translationsWhere = [];
    for (const value of valuesToTranslate) {
      translationsWhere.push({
        translatable_type: translationConfig.type,
        translatable_id: value.translatable_id,
        column: value.column,
        locale: value.locale,
      });
    }

    // 去重处理
    const uniqueTranslationsWhere = this.removeDuplicateTranslations(translationsWhere);

    // 批量获取翻译
    const translations = await this.translationService.getTranslations(uniqueTranslationsWhere);

    // 将翻译结果转换为Map以便快速查找
    const translationsMap = this.buildTranslationsMap(translations);

    // 应用翻译
    return this.applyTranslations(data, translationsMap, translationConfig.fields);
  }
} 