import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobCategoryDto {
  @ApiProperty({
    example: 'Software Development',
    description: 'The name of the job category',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Jobs related to software creation and maintenance',
    description: 'Description of the job category',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  createdBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  updatedBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  deletedBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  Delete_flg?: number;
}

export class UpdateJobCategoryDto {
  @ApiProperty({
    example: 'Software Development',
    description: 'The name of the job category',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Jobs related to software creation and maintenance',
    description: 'Description of the job category',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  updatedBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  deletedBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  Delete_flg?: number;
}
