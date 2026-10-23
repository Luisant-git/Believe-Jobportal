import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsOptional, 
  IsUrl, 
  IsEmail, 
  IsPhoneNumber, 
  IsInt 
} from 'class-validator';

export class CreateCompanyDetailsDto {
  @ApiProperty({ example: 'Acme Inc', description: 'The name of the company' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'https://example.com/logo.png', description: 'URL of the company logo', required: false })
  @IsOptional()
  @IsUrl()
  companyLogo?: string;

  @ApiProperty({ example: 'https://acme.com', description: 'Company website URL', required: false })
  @IsOptional()
  @IsUrl()
  companyWebsite?: string;

  @ApiProperty({ example: 'A leading tech company', description: 'Description of the company', required: false })
  @IsOptional()
  @IsString()
  companyDescription?: string;

  @ApiProperty({ example: 'New York', description: 'Company location', required: false })
  @IsOptional()
  @IsString()
  companyLocation?: string;

  @ApiProperty({ example: 'New York City', description: 'Company city', required: false })
  @IsOptional()
  @IsString()
  companyCity?: string;

  @ApiProperty({ example: 'NY', description: 'Company state', required: false })
  @IsOptional()
  @IsString()
  companyState?: string;

  @ApiProperty({ example: '123 Main St', description: 'Company address', required: false })
  @IsOptional()
  @IsString()
  companyAddress?: string;

  @ApiProperty({ example: '+1234567890', description: 'Company phone number', required: false })
  @IsOptional()
@IsString()
  companyPhone?: string;

  @ApiProperty({ example: 'contact@acme.com', description: 'Company email', required: false })
  @IsOptional()
  @IsEmail()
  companyEmail?: string;

  @ApiProperty({ example: 1, description: 'ID of the user creating the record', required: false })
  @IsOptional()
  @IsInt()
  createdBy?: string;
}