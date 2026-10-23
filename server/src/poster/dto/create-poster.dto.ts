import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePosterDto {
  @ApiProperty({ description: 'Poster name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Poster image URL' })
  @IsNotEmpty()
  @IsString()
  image: string;
  
  @ApiProperty({ description: 'Is poster active', default: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}