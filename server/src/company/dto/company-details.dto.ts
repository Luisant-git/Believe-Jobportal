import { ApiProperty } from '@nestjs/swagger';

export class CompanyDetailsDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'UUID of the company' })
  id: string;

  @ApiProperty({ example: 'Acme Inc', description: 'The name of the company' })
  companyName: string;

  @ApiProperty({ example: 'https://example.com/logo.png', description: 'URL of the company logo', required: false })
  companyLogo?: string;

  @ApiProperty({ example: 'https://acme.com', description: 'Company website URL', required: false })
  companyWebsite?: string;

  @ApiProperty({ example: 'A leading tech company', description: 'Description of the company', required: false })
  companyDescription?: string;

  @ApiProperty({ example: 'New York', description: 'Company location', required: false })
  companyLocation?: string;

  @ApiProperty({ example: 'New York City', description: 'Company city', required: false })
  companyCity?: string;

  @ApiProperty({ example: 'NY', description: 'Company state', required: false })
  companyState?: string;

  @ApiProperty({ example: '123 Main St', description: 'Company address', required: false })
  companyAddress?: string;

  @ApiProperty({ example: '+1234567890', description: 'Company phone number', required: false })
  companyPhone?: string;

  @ApiProperty({ example: 'contact@acme.com', description: 'Company email', required: false })
  companyEmail?: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-02T00:00:00.000Z', description: 'Last update timestamp' })
  updatedAt: Date;

  @ApiProperty({ example: 1, description: 'ID of the user who created the record', required: false })
  createdBy?: string;

  @ApiProperty({ example: 1, description: 'ID of the user who last updated the record', required: false })
  updatedBy?: string;
}