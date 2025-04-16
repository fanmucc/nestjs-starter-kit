import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException, UseGuards, } from '@nestjs/common';
import { CodeDemoService } from './code-demo.service';
import { CreateCodeDemoDto } from './dto/create-code-demo.dto';
import { UpdateCodeDemoDto } from './dto/update-code-demo.dto';
import { HttpStatus } from '@nestjs/common';
import { BusinessException } from '../../../../../exceptions/business.exception';
import { ErrorCode } from '../../../../../Enums/error-code.enum';

// 引入守卫
import { JobGuard } from '../../../../../guards/job.guard';
// 引入装饰器
import { Roles } from '../../../../../roles/decorators/roles.decorator';
import { RolesGuard } from '../../../../../roles/roles.guard';
import { CompanySelf } from '../../../../../roles/decorators/company-self.decorator';
// 引入dto转换器
import { ResponseDto } from '../../../../../interfaces/backend_response.interceptor';

@Controller('code-demo')
@UseGuards(RolesGuard)
// @Roles(['company']) // 类级别的角色要求
export class CodeDemoController {
  constructor(private readonly codeDemoService: CodeDemoService) { }

  @Post()
  @ResponseDto(CreateCodeDemoDto)
  create(@Body() createCodeDemoDto: CreateCodeDemoDto) {
    // return this.codeDemoService.create(createCodeDemoDto);
    return {
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ],
      meta: {
        pagination: {
          total: 100,
          page: 1,
          limit: 10,
          totalPages: 10
        }
      }
    }
  }

  @Get()
  @Roles(['company']) // 方法级别的角色要求
  @UseGuards(JobGuard)
  findAll() {
    // return this.codeDemoService.findAll();
    // 2. 触发已知业务错误
    // 3. 触发未知错误
    // 4. 401 未授权错误
    // throw new NotFoundException(`ID为 的资源不存在`);
    // throw new UnauthorizedException('请先登录');
    // throw new Error('数据库连接失败');
    // throw new BusinessException(
    //   '权限不足',
    //   ErrorCode.FORBIDDEN,
    //   { requiredRole: 'admin' },
    // );
    return {
      id: 1
    }
    // return {
    //   data: [
    //     { id: 1, name: 'Item 1' },
    //     { id: 2, name: 'Item 2' }
    //   ],
    //   meta: {
    //     pagination: {
    //       total: 100,
    //       page: 1,
    //       limit: 10,
    //       totalPages: 10
    //     }
    //   }
    // }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codeDemoService.findOne(+id);
  }

  @Patch(':id')
  @CompanySelf('id')
  update(@Param('id') id: string, @Body() updateCodeDemoDto: UpdateCodeDemoDto) {
    return this.codeDemoService.update(+id, updateCodeDemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codeDemoService.remove(+id);
  }
}
