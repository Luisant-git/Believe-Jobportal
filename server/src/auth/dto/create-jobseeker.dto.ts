// auth/dto/create-jobseeker.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';

export class CreateJobSeekerDto {
  @ApiProperty({ example: 'jobseeker@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Jane' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'resume.pdf', required: false })
  @IsString()
  @IsOptional()
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

  @ApiPropertyOptional({ example: '50000' })
  @IsString()
  @IsOptional()
  preferredSalary?: string;

  @ApiProperty({ example: ['JavaScript', 'TypeScript'], required: false })
  @IsOptional()
  skills?: string[];

  @ApiProperty({ example: '5 years of web development', required: false })
  @IsString()
  @IsOptional()
  experience?: string;

  @ApiProperty({ example: 'BSc Computer Science', required: false })
  @IsString()
  @IsOptional()
  education?: string;

  @ApiProperty({ example: 'city', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: '12th', required: false })
  @IsString()
  @IsOptional()
  highestEducation?: string;

  @ApiProperty({ example: '9876543210', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
  
  @ApiPropertyOptional({ example: 'Male' })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional({ example: 'San Francisco, CA' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ example: 'New York, NY' })
  @IsString()
  @IsOptional()
  current_location?: string;
}
