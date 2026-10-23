import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AppStatus, Role } from '@prisma/client';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { Request as ExpressRequest } from 'express';

interface CustomRequestWithUser extends ExpressRequest {
  user: { id: string };
}

@ApiTags('Applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.admin, Role.employer, Role.job_seeker)
  // @ApiBearerAuth()
  @Post(':userId') 
@ApiOperation({ summary: 'Create a new application' })
@ApiResponse({ status: 201, description: 'Application created' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Forbidden' })
async create(
  @Param('userId') userId: string, 
  @Body() dto: CreateApplicationDto 
) {
  try {
    return await this.applicationService.create(userId, dto); 
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}

  @Get()
  @Get()
  @ApiOperation({ summary: 'Get applications with filters and pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by job title, company name, or job code',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: AppStatus,
    description: 'Application status filter',
  })
  @ApiQuery({
    name: 'minSalary',
    required: false,
    type: Number,
    description: 'Minimum expected salary',
  })
  @ApiQuery({
    name: 'maxSalary',
    required: false,
    type: Number,
    description: 'Maximum expected salary',
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('status') status?: AppStatus,
    @Query('minSalary') minSalary?: number,
    @Query('maxSalary') maxSalary?: number,
  ) {
    return this.applicationService.findAll(
      page,
      limit,
      search,
      status,
      minSalary,
      maxSalary,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.employer, Role.job_seeker, Role.super_admin)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get application by ID' })
  @ApiResponse({ status: 200, description: 'Application found' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async findOne(@Param('id') id: string) {
    try {
      const application = await this.applicationService.findOne(id);
      if (!application) {
        throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
      }
      return application;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.employer, Role.job_seeker, Role.super_admin)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update application by ID' })
  @ApiResponse({ status: 200, description: 'Application updated' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateApplicationDto) {
    try {
      return await this.applicationService.update(id, dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.employer, Role.job_seeker, Role.super_admin)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete application by ID' })
  @ApiResponse({ status: 200, description: 'Application deleted' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async remove(@Param('id') id: string) {
    try {
      return await this.applicationService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.employer, Role.super_admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update application status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateApplicationStatusDto,
    @Request() req: any,
  ) {
    try {
      const userId = req.user.userId;
      const result = await this.applicationService.updateStatus(
        id,
        updateDto,
        userId,
      );

      return {
        success: true,
        data: result,
        message: 'Application status updated successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            success: false,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Failed to update application status',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('employers/:userId/applications')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.admin, Role.employer)
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Get applications for an employer' })
  @ApiResponse({ status: 200, description: 'Applications found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getApplicationsForEmployer(@Param('userId') employerId: string) {
    try {
      const applications =
        await this.applicationService.getApplicationForThatEmployer(employerId);
      return applications;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('jobseekers/:userId/applications')
  @ApiOperation({ summary: 'Get applications for an jobseeker' })
  @ApiResponse({ status: 200, description: 'Applications found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getApplicationsForJobSeeker(@Param('userId') userId: string) {
    try {
      const applications =
        await this.applicationService.getApplicationsForJobSeeker(userId);
      return applications;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
