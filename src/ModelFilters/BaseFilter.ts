import { ConfigService } from '@nestjs/config';
import { BusinessException } from '../exceptions-filters/exceptions/business.exception';
import { HttpStatus } from '@nestjs/common';

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
  private static configService: ConfigService;

  constructor(filters: BaseFilterOptions) {
    this.where = this.buildBaseWhereClause(filters);
  }

  // 设置 ConfigService 实例
  static setConfigService(configService: ConfigService) {
    BaseFilter.configService = configService;
  }

  // 获取默认分页大小
  private getDefaultPerPage(): number {
    if (BaseFilter.configService) {
      const perPage = BaseFilter.configService.get<string>('TABLE_DEFAULT_PER_PAGE');
      // 如果配置存在，转换为数字，否则使用默认值
      return perPage ? parseInt(perPage, 10) : 10;
    }
    return 10; // 默认值
  }

  protected buildBaseWhereClause(filters: BaseFilterOptions): Record<string, any> {
    const where: Record<string, any> = {};

    // 默认 排除已删除数据
    where.deleted_at = null;

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

  paginate(page: number = 1, perPage: number = this.getDefaultPerPage()): this {
    if (typeof page !== 'number' || typeof perPage !== 'number') {
      // 这里为已知错误
      throw new BusinessException('分页参数必须为数字', 400,);
    }
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