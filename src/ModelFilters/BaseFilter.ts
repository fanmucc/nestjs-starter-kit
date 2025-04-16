// 基础过滤器
export interface BaseFilterOptions {
  // status?: number;
  // startDate?: Date;
  // endDate?: Date;
}

export class BaseFilter {
  protected where: Record<string, any> = {};
  protected orderBy: Record<string, 'asc' | 'desc'> = {};
  protected skip?: number;
  protected take?: number;

  constructor(filters: BaseFilterOptions) {
    this.where = this.buildBaseWhereClause(filters);
  }

  protected buildBaseWhereClause(filters: BaseFilterOptions): Record<string, any> {
    const where: Record<string, any> = {};

    // 处理状态过滤
    // if (filters.status !== undefined) {
    //   where.status = filters.status;
    // }

    // // 处理日期范围查询
    // if (filters.startDate && filters.endDate) {
    //   where.createdAt = {
    //     gte: new Date(filters.startDate),
    //     lte: new Date(filters.endDate),
    //   };
    // }

    return where;
  }

  addWhere(condition: Record<string, any>): this {
    this.where = { ...this.where, ...condition };
    return this;
  }

  orderByDesc(field: string): this {
    this.orderBy[field] = 'desc';
    return this;
  }

  orderByAsc(field: string): this {
    this.orderBy[field] = 'asc';
    return this;
  }

  paginate(page: number = 1, perPage: number = 10): this {
    this.skip = (page - 1) * perPage;
    this.take = perPage;
    return this;
  }

  getQuery() {
    return {
      where: this.where,
      ...(Object.keys(this.orderBy).length > 0 && { orderBy: this.orderBy }),
      ...(this.skip !== undefined && { skip: this.skip }),
      ...(this.take !== undefined && { take: this.take }),
    };
  }
} 