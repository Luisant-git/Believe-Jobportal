// src/jobs/dto/create-job.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobType, JobStatus } from '@prisma/client';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  IsUUID,
  IsBoolean,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CreateJobDto {
  @ApiProperty({
    example: 'Senior Software Engineer',
    description: 'The title of the job position',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'We are looking for an experienced software engineer to join our team...',
    description:
      'Detailed description of the job responsibilities and requirements',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'San Francisco, CA',
    description: 'Primary work location for the position',
  })
  @IsString()
  location: string;

  @ApiProperty({
    enum: JobType,
    example: JobType.full_time,
    description: 'Type of employment (e.g., full-time, part-time, contract)',
  })
  @IsEnum(JobType)
  type: JobType;

  @ApiPropertyOptional({
    example: '94105',
    description: 'ZIP/Postal code for the job location',
  })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiPropertyOptional({
    example: '5+ years',
    description: 'Required years of experience for the position',
  })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiPropertyOptional({
    example: '₹120,000 - ₹150,000 per year',
    description: 'Expected compensation range for the position',
  })
  @IsOptional()
  @IsString()
  salaryRange?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the position allows remote work',
  })
  @IsOptional()
  @IsBoolean()
  remote?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Whether the job posting has been approved',
  })
  @IsOptional()
  @IsBoolean()
  approved?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Whether the job is active and visible to job seekers',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 3,
    description: 'Number of open positions available',
  })
  @IsOptional()
  @IsNumber()
  numberOfPositions?: number;

  // @ApiPropertyOptional({
  //   example: '2023-01-01T00:00:00Z',
  //   description: 'Date when the job position was opened',
  // })
  // @ApiPropertyOptional({
  //   example: new Date().toISOString(),
  //   description: 'The date the position was opened (ISO 8601 format)',
  // })
  // @IsOptional()
  // @IsDate()
  // dateOpened?: Date;

  // @ApiPropertyOptional({
  //   example: '2025-05-15T12:00:00Z',
  //   description: 'Target date to fill the position by (ISO 8601 format)',
  // })
  // @IsOptional()
  // @IsDate()
  // targetDate?: Date;

  @ApiPropertyOptional({
    example: 'Information Technology',
    description: 'Industry sector for the job',
  })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Number of times the job has been viewed',
  })
  @IsOptional()
  @IsNumber()
  viewCount?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether this job should be featured prominently',
  })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Whether this job requires immediate hiring',
  })
  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean;

  @ApiPropertyOptional({
    example: 'Priority hire for Q4 project',
    description: 'Internal notes about the job posting',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    example: 'TechCorp Inc.',
    description: 'Name of the hiring company',
  })
  @IsString()
  companyName: string;

  @ApiProperty({
    example: '5ff7d6c3-7b04-403c-913f-64a094d3f382',
    description: 'Name of the hiring company',
  })
  @IsString()
  @IsOptional()
  companyId?: string;

  @ApiPropertyOptional({
    example: '2023-02-15',
    description: 'Date when the position was filled',
  })
  @IsOptional()
  @IsString()
  filledDate?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
    description: 'URL to the company logo',
  })
  @IsOptional()
  @IsString()
  Companypicture?: string;

  @ApiProperty({
    example: 'TCSE-2023-01',
    description: 'Internal job reference code',
  })
  @IsString()
  jobCode: string;

  @ApiProperty({
    type: [String],
    example: ['Be', 'Btech', 'Bcom', 'Msc'],
    description: 'List of required technical skills',
  })
  @IsArray()
  @IsOptional()
  qualifications: string[];

  @ApiProperty({
    type: [String],
    example: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
    description: 'List of required technical skills',
  })
  @IsArray()
  @ArrayNotEmpty()
  skillsRequired: string[];

  @ApiPropertyOptional({
    enum: JobStatus,
    example: JobStatus.open,
    description: 'Current status of the job posting',
    default: JobStatus.open,
  })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @ApiPropertyOptional({
    example: '2a922996-707d-4b2e-97c2-384d09a580fb',
    description: 'UUID of the job category',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({
    example: 'California',
    description: 'State for the location',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    example: 'San Francisco',
    description: 'City for the location',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    example: '94105',
    description: 'Postal code for the location',
  })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiPropertyOptional({
    example: 'Financial District',
    description: 'Area or neighborhood within the city',
  })
  @IsOptional()
  @IsString()
  area?: string;

  @ApiProperty({
    type: [String],
    example: ['Work from home', 'Health insurance', 'Weekly two day leave'],
    description: 'List of required benefits',
  })
  @IsArray()
  @ArrayNotEmpty()
  benefits: string[];

  @ApiPropertyOptional({
    example: 1,
    description: 'ID of the user who created the job',
  })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID of the user who last updated the job',
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Delete flag (0 = not deleted, 1 = deleted)',
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  Delete_flg?: number;
}
