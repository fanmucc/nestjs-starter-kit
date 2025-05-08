import { Transform } from 'class-transformer';

/**
 * @TransformBigInt 装饰器：将 bigint 类型转换为 number 类型
 * 用于处理数据库返回的 bigint 类型字段（如 id, parent_id 等）
 * 
 * 使用示例：
 * ```typescript
 * export class JobPositionDto {
 *   @TransformBigInt()
 *   id: number;
 * 
 *   @TransformBigInt()
 *   parent_id: number;
 * }
 * ```
 */
export const TransformBigInt = () => Transform(({ value }) =>
  typeof value === 'bigint' ? Number(value) : value
); 