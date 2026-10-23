import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCompanyDetailsDto } from './create-company-details.dto';

export class UpdateCompanyDetailsDto extends PartialType(CreateCompanyDetailsDto) {
}