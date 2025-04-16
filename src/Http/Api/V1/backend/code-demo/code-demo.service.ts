import { Injectable } from '@nestjs/common';
import { CreateCodeDemoDto } from './dto/create-code-demo.dto';
import { UpdateCodeDemoDto } from './dto/update-code-demo.dto';

@Injectable()
export class CodeDemoService {
  create(createCodeDemoDto: CreateCodeDemoDto) {
    return 'This action adds a new codeDemo';
  }

  findAll() {
    return `This action returns all codeDemo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} codeDemo`;
  }

  update(id: number, updateCodeDemoDto: UpdateCodeDemoDto) {
    return `This action updates a #${id} codeDemo`;
  }

  remove(id: number) {
    return `This action removes a #${id} codeDemo`;
  }
}
