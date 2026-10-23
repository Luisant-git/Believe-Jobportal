import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateSubscriptionDto {
  @ApiProperty({ description: 'Subscription active status', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Subscription candidate limit', required: false })
  @IsOptional()
  @IsNumber()
  candidateLimit?: number;

  @ApiProperty({ description: 'Subscription job limit', required: false })
  @IsOptional()
  @IsNumber()
  jobLimit?: number;

  @ApiProperty({ description: 'Subscription start date', required: false })
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value).toISOString() : value)
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Subscription end date', required: false })
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value).toISOString() : value)
  @IsDateString()
  endDate?: string;

  @ApiProperty({ description: 'Subscription transactionId', required: false })
  @IsOptional()
  @IsString()
  transactionId?: string;

  @ApiProperty({ description: 'Subscription screenshot', required: false })
  @IsOptional()
  @IsString()
  screenshot?: string;
}
