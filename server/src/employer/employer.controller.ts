// employer.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@ApiTags('employers')
@Controller('employers')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Get()
  async findAll(
    @Query('activeOnly') activeOnly: boolean = true,
    @Query('search') search: string = '',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.employerService.findAll(activeOnly, search, page, limit);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active employers' })
  @ApiResponse({ status: 200, description: 'List of active employers' })
  findActive() {
    return this.employerService.getActiveEmployers();
  }

  @Get('inactive')
  @ApiOperation({ summary: 'Get all inactive employers' })
  @ApiResponse({ status: 200, description: 'List of inactive employers' })
  findInactive() {
    return this.employerService.getInactiveEmployers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employer by ID' })
  @ApiResponse({ status: 200, description: 'Employer details' })
  findOne(@Param('id') id: string) {
    return this.employerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update employer by ID' })
  @ApiResponse({ status: 200, description: 'Employer updated successfully' })
  update(
    @Param('id') id: string,
    @Body() updateEmployerDto: UpdateEmployerDto,
  ) {
    return this.employerService.update(id, updateEmployerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete employer by ID' })
  @ApiResponse({ status: 200, description: 'Employer deleted successfully' })
  remove(@Param('id') id: string) {
    return this.employerService.remove(id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate employer' })
  @ApiResponse({
    status: 200,
    description: 'Employer deactivated successfully',
  })
  deactivate(@Param('id') id: string) {
    return this.employerService.deactivate(id);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate employer' })
  @ApiResponse({ status: 200, description: 'Employer activated successfully' })
  activate(@Param('id') id: string) {
    return this.employerService.activate(id);
  }

  @Patch(':id/toggle-trust')
  @ApiOperation({ summary: 'Toggle employer trust status' })
  @ApiResponse({ status: 200, description: 'Employer trust status toggled successfully' })
  @ApiResponse({ status: 404, description: 'Employer not found' })
  toggleTrust(@Param('id') id: string) {
    return this.employerService.toggleTrust(id);
  }

  @Get('trusted/all')
  @ApiOperation({ summary: 'Get all trusted employers' })
  @ApiResponse({ status: 200, description: 'List of trusted employers' })
  getTrustedEmployers() {
    return this.employerService.getTrustedEmployers();
  }
}
