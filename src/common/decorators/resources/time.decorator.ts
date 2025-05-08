import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

// 扩展 dayjs 以支持 UTC
dayjs.extend(utc);

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
export const TransformTime = () => Transform(({ value }) =>
  value ? dayjs(value).utc().format('YYYY-MM-DD HH:mm:ss') : null
); 