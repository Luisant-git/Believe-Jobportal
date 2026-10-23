import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEnquiryDto {
  @ApiProperty({ description: 'Name of the person making enquiry' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Mobile number' })
  @IsNotEmpty()
  @IsString()
  mobileno: string;

  @ApiProperty({ description: 'Additional queries', required: false })
  @IsOptional()
  @IsString()
  queries?: string;
}