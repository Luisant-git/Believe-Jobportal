import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateEmployerUserDto {
  @ApiPropertyOptional({ example: 'employer@company.com' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional({ example: 'Tech Corp' })
  @IsString()
  @IsOptional()
  companyName: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsString()
  @IsOptional()
  companyLogo?: string;

  @ApiPropertyOptional({ example: 'https://example.com' })
  @IsString()
  @IsOptional()
  companyWebsite?: string;

  @ApiPropertyOptional({ example: 'A leading tech company' })
  @IsString()
  @IsOptional()
  companyDescription?: string;

  @ApiPropertyOptional({ example: 'ID12345' })
  @IsString()
  @IsOptional()
  identityProof?: string;

  @ApiPropertyOptional({ example: 'Private' })
  @IsString()
  @IsOptional()
  companyType?: string;

  @ApiPropertyOptional({ example: '100-500' })
  @IsString()
  @IsOptional()
  companySize?: string;

  @ApiPropertyOptional({ example: 'Technology' })
  @IsString()
  @IsOptional()
  companyIndustry?: string;

  @ApiPropertyOptional({ example: '123 Main St' })
  @IsString()
  @IsOptional()
  companyLocation?: string;

  @ApiPropertyOptional({ example: 'San Francisco' })
  @IsString()
  @IsOptional()
  companyCity?: string;

  @ApiPropertyOptional({ example: 'California' })
  @IsString()
  @IsOptional()
  companyState?: string;
  
  @ApiPropertyOptional({ example: '10001' })
  @IsString()
  @IsOptional()
  companyPincode?: string;

  @ApiPropertyOptional({ example: '123 Main St, San Francisco, CA' })
  @IsString()
  @IsOptional()
  companyAddress?: string;

  @ApiPropertyOptional({ example: '+1-800-555-1234' })
  @IsString()
  @IsOptional()
  companyPhone?: string;

  @ApiPropertyOptional({ example: 'contact@company.com' })
  @IsString()
  @IsOptional()
  companyEmail?: string;

  @ApiPropertyOptional({ example: 'xyz' })
  @IsString()
  @IsOptional()
  contactPerson?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  isactive?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  isVerified?: boolean;

  @ApiPropertyOptional({ example: 'Raghul' })
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiPropertyOptional({ example: 'HR Manager' })
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiPropertyOptional({ example: 'employee_identity.pdf' })
  @IsString()
  @IsOptional()
  employee_id?: string;

  @ApiPropertyOptional({ example: 'auth_letter.pdf' })
  @IsString()
  @IsOptional()
  authorization_letter?: string;

  @ApiPropertyOptional({ example: 'business_card.jpg' })
  @IsString()
  @IsOptional()
  business_card?: string;
}