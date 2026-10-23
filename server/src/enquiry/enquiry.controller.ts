import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

@ApiTags('Enquiry')
@Controller('enquiry')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Post()
  @ApiOperation({ summary: 'Create new enquiry and send email' })
  @ApiResponse({ status: 201, description: 'Enquiry created successfully' })
  async createEnquiry(@Body() createEnquiryDto: CreateEnquiryDto) {
    return this.enquiryService.createEnquiry(createEnquiryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all enquiries' })
  @ApiResponse({ status: 200, description: 'Enquiries retrieved successfully' })
  async getEnquiries(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    return this.enquiryService.getEnquiries(+page, +limit);
  }
}