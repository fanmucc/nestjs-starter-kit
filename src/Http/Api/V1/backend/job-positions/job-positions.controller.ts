import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';

import { TranslationEnum } from '../../../../../Enums/translation';

import { JobPositionsService } from './job-positions.service';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { UpdateJobPositionDto } from './dto/update-job-position.dto';
import { SearchJobPositionDto } from './dto/search.dto';
import { ResponseDto } from '../../../../../interfaces/backend_response.interceptor';
import { RemoveManyDto } from './dto/delete.dto';
// 引入返回类型
import { JobPositionsResourceDto } from '../../../../Resources/v1/backend/JobPositions.dto';
import { ResponseTranslation } from '../../../../../interfaces/response_translation.interceptor';
@Controller('')
export class JobPositionsController {
  constructor(private readonly jobPositionsService: JobPositionsService) { }

  @Post()
  @ResponseDto(JobPositionsResourceDto)
  create(@Body() createJobPositionDto: CreateJobPositionDto) {
    return this.jobPositionsService.create(createJobPositionDto);
  }

  @Get()
  @ResponseTranslation({
    type: TranslationEnum.JOB_POSITION,
    fields: ['name', 'parent_name']
  })
  @ResponseDto(JobPositionsResourceDto)
  findAll(@Query() searchDto: SearchJobPositionDto) {
    return this.jobPositionsService.findAll(searchDto);
  }

  @Get(':id')
  @ResponseTranslation({
    type: TranslationEnum.JOB_POSITION,
    fields: ['name', 'parent_name']
  })
  @ResponseDto(JobPositionsResourceDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobPositionsService.findOne(id);
  }

  @Put(':id')
  @ResponseDto(JobPositionsResourceDto)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJobPositionDto: UpdateJobPositionDto) {
    return this.jobPositionsService.update(id, updateJobPositionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jobPositionsService.remove(id);
  }

  // 批量删除
  @Post('delete/many')
  removeMany(@Body() data: RemoveManyDto) {
    return this.jobPositionsService.removeMany(data.ids);
  }
}
