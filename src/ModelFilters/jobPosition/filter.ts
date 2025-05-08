import { BaseFilter, BaseFilterOptions } from '../BaseFilter';

export interface JobFilterOptions extends BaseFilterOptions {
  keyword?: string;
}

export class JobFilter extends BaseFilter {

  constructor(filters: JobFilterOptions) {
    super(filters);
    this.where = { ...this.where, ...this.buildJobWhereClause(filters) };
  }

  private buildJobWhereClause(filters: JobFilterOptions): Record<string, any> {
    const where: Record<string, any> = {};

    // 处理关键字搜索
    if (filters.keyword) {
      where.OR = [
        { name: { contains: filters.keyword } },
      ];
    }
    return where;
  }
}