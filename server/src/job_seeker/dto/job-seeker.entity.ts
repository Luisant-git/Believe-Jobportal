import { Application, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class JobSeekerEntity {
  @ApiProperty({
    description: 'Unique identifier for the job seeker',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'URL or path to the resume file',
    example: 'https://example.com/resumes/john-doe.pdf',
    required: false,
  })
  resume?: string;

  @ApiProperty({ example: 'confirm password', required: false })
  confirmPassword?: string;

  @ApiProperty({ example: 'work status', required: false })
  workStatus?: string;

  @ApiProperty({ example: 'preferred Locations', required: false })
  preferredLocations?: string[];

  @ApiProperty({ example: 'preferred Salary', required: false })
  preferredSalary?: string;

  @ApiProperty({
    description: 'Array of skills possessed by the job seeker',
    example: ['JavaScript', 'TypeScript', 'NestJS'],
    type: [String],
  })
  skills: string[];

  @ApiProperty({
    description: 'Work experience description',
    example: '5 years of full-stack development',
    required: false,
  })
  experience?: string;

  @ApiProperty({
    description: 'Whether the job seeker profile is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Education background',
    example: 'BSc in Computer Science',
    required: false,
  })
  education?: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-05-14T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-05-14T10:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Associated user ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;
}
