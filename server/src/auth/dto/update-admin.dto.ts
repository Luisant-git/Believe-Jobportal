import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({ example: 'admin@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'John', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 'newpassword', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: ['all', 'admin'], required: false })
  @IsString({ each: true })
  @IsOptional()
  permissions?: string[];

  @ApiProperty({ example: 'admin', required: false })
  @IsString()
  @IsOptional()
  role?: string;
}
