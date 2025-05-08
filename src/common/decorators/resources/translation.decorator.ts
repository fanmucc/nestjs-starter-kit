import { Transform } from 'class-transformer';
import { TranslationValueEnum } from '../../../Enums/translation';
/**
 * @TransformTime 装饰器：将时间戳转换为日期类型
 * 
 * 使用示例：
 * ```typescript
 * export class JobPositionDto {
 *   @TransformTime()
 *   created_at: string;
 * 
 *   @TransformTime()
 *   updated_at: string;
 * }
 * ```
 */
export const TransformTranslation = () => Transform(({ value }) => {
  // 如果是多语言对象，直接返回
  if (value && typeof value === 'object') {
    // 强制转换为普通对象
    const plain = typeof value.toJSON === 'function'
      ? value.toJSON()
      : JSON.parse(JSON.stringify(value));

    return {
      [TranslationValueEnum.DEFAULT]: plain.default,
      [TranslationValueEnum.EN]: plain.en,
      [TranslationValueEnum.ZH_CN]: plain.zh_CN,
    };
  }
  // 如果是字符串，保持不变
  if (typeof value === 'string') {
    return value;
  }
  // 其他情况返回空对象
  return value;
})
