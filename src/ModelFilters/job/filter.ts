import { BaseFilter, BaseFilterOptions } from '../BaseFilter';

export interface JobFilterOptions extends BaseFilterOptions {
  keyword?: string;
  companyId?: number;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  jobType?: string; // 全职/兼职/实习
  experience?: string; // 工作经验要求
  education?: string; // 学历要求
  skills?: string[]; // 技能要求
}

export class JobFilter extends BaseFilter {
  static filter(filters: JobFilterOptions): JobFilter {
    return new JobFilter(filters);
  }

  constructor(filters: JobFilterOptions) {
    super(filters);
    this.where = { ...this.where, ...this.buildJobWhereClause(filters) };
  }

  private buildJobWhereClause(filters: JobFilterOptions): Record<string, any> {
    const where: Record<string, any> = {};

    // 处理关键字搜索
    if (filters.keyword) {
      where.OR = [
        { title: { contains: filters.keyword } },
        { description: { contains: filters.keyword } },
        { company: { name: { contains: filters.keyword } } },
      ];
    }

    // 处理公司过滤
    if (filters.companyId) {
      where.companyId = filters.companyId;
    }

    // 处理工作地点过滤
    if (filters.location) {
      where.location = filters.location;
    }

    // 处理薪资范围过滤
    if (filters.minSalary || filters.maxSalary) {
      where.salary = {};
      if (filters.minSalary) {
        where.salary.gte = filters.minSalary;
      }
      if (filters.maxSalary) {
        where.salary.lte = filters.maxSalary;
      }
    }

    // 处理工作类型过滤
    if (filters.jobType) {
      where.jobType = filters.jobType;
    }

    // 处理工作经验要求过滤
    if (filters.experience) {
      where.experience = filters.experience;
    }

    // 处理学历要求过滤
    if (filters.education) {
      where.education = filters.education;
    }

    // 处理技能要求过滤
    if (filters.skills && filters.skills.length > 0) {
      where.skills = {
        hasSome: filters.skills,
      };
    }

    return where;
  }
}