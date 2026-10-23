// src/application/dto/update-application-status.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { AppStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateApplicationStatusDto {
  @ApiProperty({ enum: AppStatus })
  @IsEnum(AppStatus)
  status: AppStatus;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}