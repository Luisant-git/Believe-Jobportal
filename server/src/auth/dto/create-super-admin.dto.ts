import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSuperAdminDto {
  @ApiProperty({ example: 'superadmin@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'securepassword' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Super' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Admin' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: ['all', 'super'] })
  @IsString()
  @IsOptional()
  permissions?: string[];
}