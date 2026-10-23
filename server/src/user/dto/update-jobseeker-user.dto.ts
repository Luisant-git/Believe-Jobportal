import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsArray,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class UpdateJobSeekerUserDto {
  @ApiProperty({ example: 'jobseeker@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;


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

  @ApiProperty({ example: 'work', required: false })
  @IsString()
  @IsOptional()
  workStatus?: string;

  @ApiProperty({ example: 'New York', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  preferredLocations?: string[];

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  preferredSalary?: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  gender?: string;
}