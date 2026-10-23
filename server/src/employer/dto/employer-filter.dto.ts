// dto/employer-filter.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class EmployerFilterDto {
  @ApiPropertyOptional({
    description: 'Filter by active status',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isactive?: boolean;

  @ApiPropertyOptional({ description: 'Search by company name' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({ description: 'Search by company location' })
  @IsOptional()
  @IsString()
  companyLocation?: string;

  @ApiPropertyOptional({ description: 'Search by company email' })
  @IsOptional()
  @IsString()
  companyEmail?: string;

  @ApiPropertyOptional({ description: 'Search by company phone' })
  @IsOptional()
  @IsString()
  companyPhone?: string;
}