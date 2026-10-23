import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { CreateCompanyDetailsDto } from './dto/create-company-details.dto';
import { UpdateCompanyDetailsDto } from './dto/update-company-details.dto';
import { CompanyDetailsDto } from './dto/company-details.dto';
import { CompanyDetailsService } from './company.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Company Details')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.admin, Role.employer, Role.super_admin)
@ApiBearerAuth()
@Controller('company-details')
export class CompanyDetailsController {
  constructor(private readonly companyDetailsService: CompanyDetailsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company details record' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CompanyDetailsDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCompanyDetailsDto: CreateCompanyDetailsDto) {
    return this.companyDetailsService.create(createCompanyDetailsDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all company details with search and pagination',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term for filtering company details',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  async findAll(
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.companyDetailsService.findAll(search, page, limit);
  }

  @Get('data/:id')
  @ApiOperation({ summary: 'Get a company details record by ID' })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CompanyDetailsDto,
  })
  @ApiResponse({ status: 404, description: 'Record not found' })
  findOne(@Param('id') id: string) {
    return this.companyDetailsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a company details record' })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: CompanyDetailsDto,
  })
  @ApiResponse({ status: 404, description: 'Record not found' })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDetailsDto: UpdateCompanyDetailsDto,
  ) {
    return this.companyDetailsService.update(id, updateCompanyDetailsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a company details record' })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'The record has been soft deleted',
    type: CompanyDetailsDto,
  })
  @ApiResponse({ status: 404, description: 'Record not found' })
  remove(@Param('id') id: string, @Query('deletedBy') deletedBy: number) {
    return this.companyDetailsService.remove(id, deletedBy);
  }

  @Get('/lookup')
  @ApiOperation({ summary: 'Get all company details for lookup' })
  @ApiResponse({
    status: 200,
    description: 'List of company details',
    type: [CreateCompanyDetailsDto],
  })
  async lookup() {
    return this.companyDetailsService.companyLookup();
  }
}
