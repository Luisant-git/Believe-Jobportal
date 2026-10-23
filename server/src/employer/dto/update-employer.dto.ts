// dto/update-employer.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateEmployerDto } from './create-employer.dto';

export class UpdateEmployerDto extends PartialType(CreateEmployerDto) {
  @ApiProperty({ required: false })
  isactive?: boolean;
}