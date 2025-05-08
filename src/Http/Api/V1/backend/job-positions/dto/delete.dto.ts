
import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class RemoveManyDto {
  @IsArray({ message: 'ids 必须为数组' })
  @ArrayNotEmpty({ message: 'ids 数组不能为空' })
  @Type(() => Number)
  @IsInt({ each: true, message: '每个 id 都必须为整数' })
  ids: number[];
}
