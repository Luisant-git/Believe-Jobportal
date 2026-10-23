import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ToggleUserStatusDto {
  @ApiProperty({ example: true, description: 'Whether the user should be active' })
  @IsBoolean()
  isactive: boolean;
}
