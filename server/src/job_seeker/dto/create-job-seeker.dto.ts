import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateJobSeekerDto {
  @ApiProperty({ example: 'resume.pdf', required: false })
  @IsOptional()
  @IsString()
  resume?: string;

  @ApiProperty({ example: 'confirm password', required: false })
  @IsOptional()
  @IsString()
  confirmPassword?: string;

  @ApiProperty({ example: 'work status', required: false })
  @IsOptional()
  @IsString()
  workStatus?: string;

  @ApiPropertyOptional({ example: ['New York', 'Remote'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferredLocations?: string[];

  @ApiProperty({ example: 'preferred Salary', required: false })
  @IsOptional()
  @IsNumber()
  preferredSalary?: string;

  @ApiProperty({ example: ['JavaScript', 'React'], type: [String] })
  @IsString({ each: true })
  skills: string[];

  @ApiProperty({ example: '5 years experience', required: false })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isactive?: boolean;

  @ApiProperty({ example: 'Bachelor of Science', required: false })
  @IsOptional()
  @IsString()
  education?: string;

  @ApiProperty({ example: 'S@gmail.com', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: 'YTQ11', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: 'john', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'due', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;
}
