import { Injectable } from '@nestjs/common';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { UpdateJobPositionDto } from './dto/update-job-position.dto';
import { SearchJobPositionDto } from './dto/search.dto';
// 引入搜索
import { JobFilter } from '../../../../../modelFilters/jobPosition/filter';
// 引入 prisma 
import { PrismaService } from '../../../../../database/prisma/prisma.service';

@Injectable()
export class JobPositionsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createJobPositionDto: CreateJobPositionDto) {
    return 'This action adds a new jobPosition';
  }

  async findAll(searchDto: SearchJobPositionDto) {
    const filter = new JobFilter(searchDto).paginate(searchDto.page, searchDto.perPage).getQuery();

    // 发起请求，包含父级职位数据
    const [items, total] = await Promise.all([
      this.prisma.job_positions.findMany({
        ...filter,
        include: {
          job_positions: true  // 包含父级职位数据
        }
      }),
      this.prisma.job_positions.count({ where: filter.where }),
    ]);

    // 转换数据结构以匹配 DTO
    const transformedItems = items.map(item => ({
      ...item,
      parent: item.job_positions  // 将 job_positions 映射为 parent
    }));

    return {
      data: transformedItems,
      meta: {
        pagination: {
          total,
          page: searchDto.page || 1,
          perPage: searchDto.perPage || 10,
          totalPages: Math.ceil(total / (searchDto.perPage || 10)),
        },
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} jobPosition`;
  }

  update(id: number, updateJobPositionDto: UpdateJobPositionDto) {
    return `This action updates a #${id} jobPosition`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobPosition`;
  }
}
