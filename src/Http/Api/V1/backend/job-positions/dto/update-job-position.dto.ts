import { PartialType } from '@nestjs/mapped-types';
import { CreateJobPositionDto } from './create-job-position.dto';

export class UpdateJobPositionDto extends PartialType(CreateJobPositionDto) {}
