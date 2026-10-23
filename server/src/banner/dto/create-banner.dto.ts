import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto {
  @ApiProperty({ description: 'Banner name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Banner image URL' })
  @IsNotEmpty()
  @IsString()
  image: string;
  
  @ApiProperty({ description: 'Is banner active', default: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}