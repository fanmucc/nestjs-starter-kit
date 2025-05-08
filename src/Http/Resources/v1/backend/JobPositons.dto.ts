import { Exclude, Expose, Transform } from 'class-transformer';

// 引入返回装饰器
import { TransformBigInt, TransformTime } from '../../../../common/decorators/resources';

export class JobPositonsResourceDto {
  @Expose()
  @TransformBigInt()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @TransformBigInt()
  parent_id: number;

  @Expose()
  @TransformTime()
  created_at: string;

  @Expose()
  @TransformTime()
  updated_at: string;

  @Expose()
  @TransformTime()
  deleted_at: string;

  @Expose()
  parent: JobPositonsResourceDto;
}
