import { Injectable } from '@nestjs/common';
import { TranslationEnum } from '../../../../../Enums/translation';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { UpdateJobPositionDto } from './dto/update-job-position.dto';
import { SearchJobPositionDto } from './dto/search.dto';
// 引入搜索
import { JobFilter } from '../../../../../modelFilters/jobPosition/filter';
// 引入 prisma 
import { PrismaService } from '../../../../../database/prisma/prisma.service';
import { TranslationsService } from '../../../../../translations/translations.service';
@Injectable()
export class JobPositionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translationsService: TranslationsService
  ) { }

  // 处理多语言翻译（独立方法，可被其他方法复用）
  private handleTranslations(jobPositionId: number, multilingualData: any) {
    try {
      // 异步处理翻译，不等待结果，不影响主流程
      this.translationsService.upsertTranslations(
        TranslationEnum.JOB_POSITION,
        jobPositionId,
        Object.entries(multilingualData)
          .filter(([locale]) => locale !== 'default') // 过滤掉 default
          .map(([locale, value]) => ({
            column: 'name',
            locale,
            value: String(value), // 确保值是字符串
          }))
      ).catch(error => {
        // 记录错误但不抛出，不影响主流程
        console.error('创建翻译失败:', error);
      });
    } catch (error) {
      // 记录错误但不抛出，不影响主流程
      console.error('处理翻译过程出错:', error);
    }
  }

  async create(createJobPositionDto: CreateJobPositionDto) {
    try {
      // 先创建基础数据
      const jobPosition = await this.prisma.job_positions.create({
        data: {
          name: createJobPositionDto.name.default || null,
          parent_id: createJobPositionDto.parent_id || null,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        }
      });

      // 异步处理翻译，不等待完成
      this.handleTranslations(Number(jobPosition.id), createJobPositionDto.name);

      return {
        ...createJobPositionDto,
        id: jobPosition.id,
      };
    } catch (error) {
      console.error('创建职位失败:', error);
      throw error;
    }
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

  async findOne(id: number) {
    const jobPosition = await this.prisma.job_positions.findUnique({
      where: { id },
      include: {
        job_positions: true
      }
    });
    return jobPosition;
  }

  async update(id: number, updateJobPositionDto: UpdateJobPositionDto) {
    try {
      // 准备更新数据
      const updateData: any = {};

      // 如果有更新名称
      if (updateJobPositionDto.name?.default) {
        updateData.name = updateJobPositionDto.name.default;
      }

      // 如果有更新父级ID
      if (updateJobPositionDto.parent_id !== undefined) {
        updateData.parent_id = updateJobPositionDto.parent_id;
      }

      // 更新时间
      updateData.updated_at = new Date();

      // 更新基础数据
      const updatedPosition = await this.prisma.job_positions.update({
        where: { id },
        data: updateData,
      });

      // 如果有多语言字段需要更新，异步处理
      if (updateJobPositionDto.name) {
        this.handleTranslations(Number(id), updateJobPositionDto.name);
      }

      // 返回处理后的职位数据（包含父级）
      return {
        ...updatedPosition,
        name: updatedPosition.name,
      };
    } catch (error) {
      console.error(`更新职位ID ${id} 失败:`, error);
      throw error;
    }
  }

  async remove(id: number) {
    await this.prisma.job_positions.update({
      where: { id },
      data: {
        deleted_at: new Date()
      }
    });

    // 删除翻译
    this.translationsService.deleteTranslations(TranslationEnum.JOB_POSITION, id);

    return {
      message: `Job position with id ${id} has been deleted successfully`
    };
  }

  async removeMany(ids: number[]) {
    await this.prisma.job_positions.updateMany({
      where: { id: { in: ids } },
      data: { deleted_at: new Date() }
    });

    // 删除翻译
    this.translationsService.deleteTranslationsMany(TranslationEnum.JOB_POSITION, ids);

    return {
      message: `Job positions with ids ${ids.join(', ')} have been deleted successfully`
    };
  }
}
