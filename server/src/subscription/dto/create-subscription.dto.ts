import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'Employer ID' })
  @IsString()
  employerId: string;

  @ApiProperty({ description: 'Subscription plan name' })
  @IsString()
  planName: string;

  @ApiProperty({ description: 'Subscription price' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Maximum number of candidates' })
  @IsNumber()
  candidateLimit: number;

  @ApiProperty({ description: 'Maximum number of jobs' })
  @IsNumber()
  jobLimit: number;

  @ApiProperty({ description: 'Subscription start date', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Subscription end date' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ description: 'Subscription transactionId'})
  @IsString()
  transactionId: string;

  @ApiProperty({ description: 'Subscription screenshot'})
  @IsString()
  screenshot: string;
}