import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { TransformTranslation } from '../../../../common/decorators/resources/translation.decorator';
// 引入返回装饰器
import { TransformBigInt, TransformTime } from '../../../../common/decorators/resources';
import { TranslationValueEnum } from '../../../../Enums/translation';
import { MultilingualName } from './base/base-translation.dto';


class Parent {
  @Expose()
  @TransformBigInt()
  id: number;

  @Expose()
  @Type(() => MultilingualName)
  name: MultilingualName;

  @Expose()
  @TransformBigInt()
  parent_id: number;
}

export class JobPositionsResourceDto {
  @Expose()
  @TransformBigInt()
  id: number;

  @Expose()
  @Type(() => MultilingualName)
  name: MultilingualName;

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
  parent: Parent;
}
