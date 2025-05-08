import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobPositionsService } from './job-positions.service';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { UpdateJobPositionDto } from './dto/update-job-position.dto';
import { SearchJobPositionDto } from './dto/search.dto';
import { ResponseDto } from '../../../../../interfaces/backend_response.interceptor';
// 引入返回类型
import { JobPositonsResourceDto } from '../../../../Resources/v1/backend/JobPositons.dto';
import { ResponseTranslation } from '../../../../../interfaces/response_translation.interceptor';
@Controller('')
export class JobPositionsController {
  constructor(private readonly jobPositionsService: JobPositionsService) { }

  @Post()
  create(@Body() createJobPositionDto: CreateJobPositionDto) {
    return this.jobPositionsService.create(createJobPositionDto);
  }

  @Get()
  @ResponseTranslation({
    type: 'App\\Models\\JobPosition',
    fields: ['name', 'parent_name']
  })
  @ResponseDto(JobPositonsResourceDto)
  findAll(@Query() searchDto: SearchJobPositionDto) {
    return this.jobPositionsService.findAll(searchDto);
  }

  @Get(':id')
  @ResponseDto(JobPositonsResourceDto)
  findOne(@Param('id') id: string) {
    return this.jobPositionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobPositionDto: UpdateJobPositionDto) {
    return this.jobPositionsService.update(+id, updateJobPositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobPositionsService.remove(+id);
  }
}
