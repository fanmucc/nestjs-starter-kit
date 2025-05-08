// 一些公共的 dto 相应文件

import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

// 关键字搜索
export class KeywordSearchDto {
  @IsOptional()
  @IsString()
  keyword?: string;
}

// 分页
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  perPage?: number;
}

// 完整的基础搜索（包含关键字和分页）
export class BaseSearchDto extends KeywordSearchDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  perPage?: number;
} 