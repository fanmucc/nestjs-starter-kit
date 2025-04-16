import { PartialType } from '@nestjs/mapped-types';
import { CreateCodeDemoDto } from './create-code-demo.dto';

export class UpdateCodeDemoDto extends PartialType(CreateCodeDemoDto) {}
