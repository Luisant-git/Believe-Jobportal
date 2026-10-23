import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterEmployerDto {
  @ApiProperty({ example: 'employer@company.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Tech Corp' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: '10001', required: false })
  @IsString()
  @IsOptional()
  companyPincode?: string;

  @ApiProperty({ example: 'registration_doc.pdf', required: false })
  @IsString()
  @IsOptional()
  legal_registration_document?: string;

  @ApiProperty({ example: 'https://example.com/logo.png', required: false })
  @IsString()
  @IsOptional()
  companyLogo?: string;

  @ApiProperty({ example: 'https://example.com', required: false })
  @IsString()
  @IsOptional()
  companyWebsite?: string;

  @ApiProperty({ example: 'A leading tech company', required: false })
  @IsString()
  @IsOptional()
  companyDescription?: string;

  @ApiProperty({ example: 'ID12345', required: false })
  @IsString()
  @IsOptional()
  identityProof?: string;

  @ApiProperty({ example: 'Private', required: false })
  @IsString()
  @IsOptional()
  companyType?: string;

  @ApiProperty({ example: '100-500', required: false })
  @IsString()
  @IsOptional()
  companySize?: string;

  @ApiProperty({ example: 'Technology', required: false })
  @IsString()
  @IsOptional()
  companyIndustry?: string;

  @ApiProperty({ example: '123 Main St', required: false })
  @IsString()
  @IsOptional()
  companyLocation?: string;

  @ApiProperty({ example: 'San Francisco', required: false })
  @IsString()
  @IsOptional()
  companyCity?: string;

  @ApiProperty({ example: 'California', required: false })
  @IsString()
  @IsOptional()
  companyState?: string;

  @ApiProperty({ example: '123 Main St, San Francisco, CA', required: false })
  @IsString()
  @IsOptional()
  companyAddress?: string;

  @ApiProperty({ example: '+1-800-555-1234', required: false })
  @IsString()
  @IsOptional()
  companyPhone?: string;

  @ApiProperty({ example: 'contact@company.com', required: false })
  @IsString()
  @IsOptional()
  companyEmail?: string;

  @ApiProperty({ example: 'xyz', required: false })
  @IsString()
  @IsOptional()
  contactPerson?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  isactive?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  isVerified?: boolean;

  @ApiProperty({ example: 'Raghul', required: false })
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiProperty({ example: 'HR Manager', required: false })
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiProperty({ example: 'employee_identity.pdf', required: false })
  @IsString()
  @IsOptional()
  employee_id?: string;

  @ApiProperty({ example: 'auth_letter.pdf', required: false })
  @IsString()
  @IsOptional()
  authorization_letter?: string;

  @ApiProperty({ example: 'business_card.jpg', required: false })
  @IsString()
  @IsOptional()
  business_card?: string;
}