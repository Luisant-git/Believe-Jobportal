import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDateString,
  IsEnum,
  Min,
  Max,
  IsUrl,
  IsUUID,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { AppStatus } from '@prisma/client';

export class CreateApplicationDto {
  @ApiProperty({
    example: 'https://example.com/resumes/john-doe-resume.pdf',
    description: "URL to the applicant's resume",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  resumeUrl: string;

  @ApiProperty({
    example: 'I am excited to apply for this position because...',
    description: 'Cover letter text',
    required: false,
  })
  @IsOptional()
  @IsString()
  coverLetter?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID of the job seeker applying',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  jobSeekerId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID of the job being applied for',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  jobId: string;

  @ApiProperty({
    example: 'PENDING',
    description: 'Current status of the application',
    enum: AppStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(AppStatus)
  status?: AppStatus;

  @ApiProperty({
    example: '2023-05-15T10:00:00Z',
    description: 'Date when the application was submitted',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  applicationDate?: Date;

  @ApiProperty({
    example: '$75,000',
    description: 'Expected salary for the position',
    required: false,
  })
  @IsOptional()
  @IsString()
  expectedSalary?: string;

  @ApiProperty({
    example: '$65,000',
    description: 'Current salary of the applicant',
    required: false,
  })
  @IsOptional()
  @IsString()
  currentSalary?: string;

  @ApiProperty({
    example: 5,
    description: 'Years of relevant experience',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  experienceYears?: number;

  @ApiProperty({
    example: '2023-05-20',
    description: 'Date when application was shortlisted',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @ValidateIf((o) => o.status === 'SHORTLISTED')
  shortlistedDate?: string;

  @ApiProperty({
    example: '2023-05-10',
    description: 'Date when application was rejected',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @ValidateIf((o) => o.status === 'REJECTED')
  rejectedDate?: string;

  @ApiProperty({
    example: '2023-06-01',
    description: 'Date when applicant was selected',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @ValidateIf((o) => o.status === 'SELECTED')
  selectedDate?: string;

  @ApiProperty({
    example: false,
    description: 'Whether this is an internal application',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isInternal?: boolean;

  @ApiProperty({
    example: 4,
    description: 'Rating of the applicant (1-5 scale)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiProperty({
    example:
      'The candidate demonstrated strong technical skills during the interview.',
    description: 'Feedback from interviews',
    required: false,
  })
  @IsOptional()
  @IsString()
  interviewFeedback?: string;
}

export class UpdateApplicationDto extends CreateApplicationDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID of the application',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
