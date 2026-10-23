

// dto/create-employer.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class CreateEmployerDto {
  @ApiProperty()
  companyName: string;

  @ApiProperty({ required: false })
  companyLogo?: string;

  @ApiProperty({ required: false })
  companyWebsite?: string;

  @ApiProperty({ required: false })
  companyDescription?: string;

  @ApiProperty({ required: false })
  identityProof?: string;

  @ApiProperty({ required: false })
  companyType?: string;

  @ApiProperty({ required: false })
  companySize?: string;

  @ApiProperty({ required: false })
  companyIndustry?: string;

  @ApiProperty({ required: false })
  companyLocation?: string;

  @ApiProperty({ required: false })
  companyCity?: string;

  @ApiProperty({ required: false })
  companyState?: string;

  @ApiProperty({ required: false })
  companyAddress?: string;

  @ApiProperty({ required: false })
  companyPhone?: string;

  @ApiProperty({ required: false })
  companyEmail?: string;

  @ApiProperty({ required: false, default: false, description: 'Whether the employer is trusted' })
  @IsOptional()
  @IsBoolean()
  isTrust?: boolean;

  @ApiProperty()
  userId: string;
}