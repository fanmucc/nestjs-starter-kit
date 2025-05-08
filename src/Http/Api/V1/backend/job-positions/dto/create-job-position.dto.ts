import { IsNotEmpty, IsObject, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TranslationValueEnum } from '../../../../../../Enums/translation';

class MultilingualName {
  @IsNotEmpty({ message: `${TranslationValueEnum.DEFAULT} 字段不能为空` })
  [TranslationValueEnum.DEFAULT]: string;

  @IsNotEmpty({ message: `${TranslationValueEnum.EN} 字段不能为空` })
  [TranslationValueEnum.EN]: string;

  @IsNotEmpty({ message: `${TranslationValueEnum.ZH_CN} 字段不能为空` })
  [TranslationValueEnum.ZH_CN]: string;
}

export class CreateJobPositionDto {
  // 父级id
  @IsOptional()
  @IsNumber()
  parent_id: number | null;

  // 名称
  @IsNotEmpty()
  @IsObject({ message: '名称必须是一个对象' })
  @ValidateNested()
  @Type(() => MultilingualName)
  name: MultilingualName;
}
