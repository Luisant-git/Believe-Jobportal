import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Query,
  BadRequestException,
  InternalServerErrorException,
  DefaultValuePipe,
  ParseIntPipe,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { query, Response } from 'express';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JobService } from './jobs.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JobStatus, Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { JobsAuditInterceptor } from 'src/common/interceptors/jobs-audit.interceptor';

export enum JobType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
  TEMPORARY = 'temporary',
}

@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @UseInterceptors(JobsAuditInterceptor)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data or duplicate entry' })
  async create(@Body() createJobDto: CreateJobDto, @Res() res: Response) {
    try {
      const job = await this.jobService.create(createJobDto);
      return res.status(HttpStatus.CREATED).json(job);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'Failed to create job',
      });
    }
  }

  // @Get()
  // @ApiOperation({
  //   summary: 'Get all jobs with filters, pagination, and search',
  // })
  // @ApiQuery({
  //   name: 'page',
  //   required: false,
  //   type: Number,
  //   description: 'Page number for pagination',
  //   example: 1,
  // })
  // @ApiQuery({
  //   name: 'limit',
  //   required: false,
  //   type: Number,
  //   description: 'Limit of items per page',
  //   example: 10,
  // })
  // @ApiQuery({
  //   name: 'search',
  //   required: false,
  //   type: String,
  //   description: 'Search keyword',
  // })
  // @ApiQuery({
  //   name: 'remote',
  //   required: false,
  //   type: Boolean,
  //   description: 'Filter by remote jobs (true/false)',
  // })
  // @ApiQuery({
  //   name: 'approved',
  //   required: false,
  //   type: Boolean,
  //   description: 'Filter by approval status (true/false)',
  // })
  // @ApiQuery({
  //   name: 'jobType',
  //   required: false,
  //   enum: JobType,
  //   description: 'Filter by job type',
  // })
  // @ApiQuery({
  //   name: 'status',
  //   required: false,
  //   enum: JobStatus,
  //   description: 'Filter by job status',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of jobs returned successfully.',
  // })
  // async findAll(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  //   @Query('search') searchTerm?: string,
  //   @Query('remote') remote?: string,
  //   @Query('approved') approved?: string,
  //   @Query('jobType') jobType?: JobType,
  //   @Query('status') status?: JobStatus,
  // ) {
  //   const remoteFilter = remote ? remote === 'true' : undefined;
  //   const approvedFilter = approved ? approved === 'true' : undefined;

  //   return this.jobService.findAll(page, limit, searchTerm, {
  //     remote: remoteFilter,
  //     approved: approvedFilter,
  //     jobType,
  //     status,
  //   });
  // }

  @Get('')
  @ApiOperation({ summary: 'Search jobs with flexible filters' })
  @ApiResponse({
    status: 200,
    description: 'List of jobs matching the filters',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term (title)',
  })
  @ApiQuery({
    name: 'skills',
    required: false,
    type: [String],
    description: 'Filter by skills (comma-separated or multiple params)',
  })
  @ApiQuery({
    name: 'location',
    required: false,
    description: 'Filter by location (partial match)',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: [
      'full_time',
      'part_time',
      'contract',
      'freelance',
      'internship',
      'temporary',
    ],
    description: 'Filter by job type',
  })
  @ApiQuery({
    name: 'salaryRange',
    required: false,
    description: 'Filter by salary range (e.g., "3000-4000")',
  })
  @ApiQuery({
    name: 'experience',
    required: false,
    description: 'Filter by experience level (partial match)',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Filter by category ID',
  })
  @ApiQuery({
    name: 'remote',
    required: false,
    type: Boolean,
    description: 'Filter remote jobs (true/false)',
  })
  async searchJob(
    @Query('search') search?: string,
    @Query('skills') skills?: string | string[],
    @Query('location') location?: string,
    @Query('type') type?: string,
    @Query('salaryRange') salaryRange?: string,
    @Query('experience') experience?: string,
    @Query('categoryId') categoryId?: string,
    @Query('remote') remote?: boolean,
  ) {
    const skillsArray =
      typeof skills === 'string'
        ? skills.split(',').map((s) => s.trim())
        : skills;

    return this.jobService.searchJobs({
      search,
      skills: skillsArray,
      location,
      type,
      salaryRange,
      experience,
      categoryId,
      remote: remote !== undefined ? Boolean(remote) : undefined,
    });
  }

  @Get('titles')
  @ApiOperation({ summary: 'Get all unique job titles' })
  @ApiResponse({
    status: 200,
    description: 'List of all unique job titles',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getAllTitles() {
    try {
      const jobs = await this.jobService.getAllTitles();
      return jobs;
    } catch (error) {
      console.error('Error in getAllTitles:', error);
      throw new InternalServerErrorException('Failed to retrieve job titles');
    }
  }

  @Get('/data/:id')
  @ApiOperation({ summary: 'Get job by ID' })
  @ApiResponse({ status: 200, description: 'Job found' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const job = await this.jobService.findOne(id);
      return res.status(HttpStatus.OK).json(job);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || `Failed to fetch job with ID ${id}`,
      });
    }
  }

  @Patch('/update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @UseInterceptors(JobsAuditInterceptor)
  @ApiOperation({ summary: 'Update job by ID' })
  @ApiResponse({ status: 200, description: 'Job updated' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @Res() res: Response,
  ) {
    try {
      const updated = await this.jobService.update(id, updateJobDto);
      return res.status(HttpStatus.OK).json(updated);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || `Failed to update job with ID ${id}`,
      });
    }
  }

  @Delete('/delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @UseInterceptors(JobsAuditInterceptor)
  @ApiOperation({ summary: 'Delete job by ID' })
  @ApiResponse({ status: 204, description: 'Job deleted' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.jobService.remove(id);
      return res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || `Failed to delete job with ID ${id}`,
      });
    }
  }

  @Get('search')
  @ApiOperation({ summary: 'Search jobs with flexible filters' })
  @ApiResponse({
    status: 200,
    description: 'List of jobs matching the filters',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term (title, description, company, etc.)',
  })
  @ApiQuery({
    name: 'companyName',
    required: false,
    description: 'filter by companyName',
  })
  @ApiQuery({
    name: 'skills',
    required: false,
    type: [String],
    description: 'Filter by skills (comma-separated or multiple params)',
  })
  @ApiQuery({
    name: 'location',
    required: false,
    description: 'Filter by location (partial match)',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: [
      'full_time',
      'part_time',
      'contract',
      'freelance',
      'internship',
      'temporary',
    ],
    description: 'Filter by job type',
  })
  @ApiQuery({
    name: 'salaryRange',
    required: false,
    description: 'Filter by salary range (e.g., "3000-4000")',
  })
  @ApiQuery({
    name: 'experience',
    required: false,
    description: 'Filter by experience level (partial match)',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Filter by category ID',
  })
  @ApiQuery({
    name: 'remote',
    required: false,
    type: Boolean,
    description: 'Filter remote jobs (true/false)',
  })
  async searchJobs(
    @Query('search') search?: string,
    @Query('companyName') companyName?: string,
    @Query('skills') skills?: string | string[],
    @Query('location') location?: string,
    @Query('type') type?: string,
    @Query('salaryRange') salaryRange?: string,
    @Query('experience') experience?: string,
    @Query('categoryId') categoryId?: string,
    @Query('remote') remote?: boolean,
  ) {
    const skillsArray =
      typeof skills === 'string'
        ? skills.split(',').map((s) => s.trim())
        : skills;

    return this.jobService.searchJobs({
      search,
      companyName,
      skills: skillsArray,
      location,
      type,
      salaryRange,
      experience,
      categoryId,
      remote: remote !== undefined ? Boolean(remote) : undefined,
    });
  }

  @Get('/skills/all')
  @ApiOperation({ summary: 'Get all unique skills from jobs' })
  @ApiResponse({
    status: 200,
    description: 'List of unique skills',
    type: [String],
  })
  async getAllSkills() {
    try {
      const skills = await this.jobService.getAllSkills();
      return skills;
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message || 'Failed to retrieve skills',
      });
    }
  }

  @Get('locations')
  @ApiOperation({ summary: 'Get all unique locations from job postings' })
  @ApiResponse({ status: 200, description: 'Array of unique locations' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAllLocations() {
    return this.jobService.getAllLocations();
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of a job' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the job to update',
    type: String,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['open', 'closed', 'pending', 'draft'],
          description: 'The new status of the job',
        },
      },
      required: ['status'],
    },
  })
  async updateJobStatus(
    @Param('id') id: string,
    @Body('status') status: JobStatus,
  ) {
    return this.jobService.updateJobStatus(id, status);
  }

  @Get('lookup')
  @ApiOperation({ summary: 'Get all jobs for lookup' })
  async lookup() {
    return this.jobService.joblookup();
  }

  @Patch('employer/user/:userId/job/:id')
  @ApiOperation({ summary: 'Update a job posting' })
  @ApiResponse({ status: 200, description: 'Job updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async updateJob(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    return this.jobService.updateEmployerJob(userId, id, updateJobDto);
  }

  @Post('user/:userId?')
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data or duplicate entry' })
  @ApiParam({
    name: 'userId',
    required: false,
    description: 'ID of the user creating the job',
    type: String,
  })
  async createEmployerjobs(
    @Param('userId') userId: string | undefined,
    @Body() createJobDto: CreateJobDto,
    @Res() res: Response,
  ) {
    try {
      const job = await this.jobService.createEmployerjobs(
        createJobDto,
        userId,
      );
      return res.status(HttpStatus.CREATED).json(job);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'Failed to create job',
      });
    }
  }

  @Get('employerjobs/:userId')
  @ApiOperation({ summary: 'Get all jobs for employer' })
  async employerAddedJobsOnly(@Param('userId') userId: string) {
    return this.jobService.employerAddedJobsOnly(userId);
  }

  @Get('employerjobs/:userId/job/:id')
  @ApiOperation({ summary: 'Get a specific job by ID for employer' })
  @ApiResponse({ status: 200, description: 'Job retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async employerJobsGetById(
    @Param('userId') userId: string,
    @Param('id') id: string,
  ) {
    return this.jobService.employerJobsGetById(userId, id);
  }

  @Delete('employer/user/:userId/job/:id')
  @ApiOperation({ summary: 'Delete a job posting' })
  @ApiResponse({ status: 200, description: 'Job deleted successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async deleteJob(@Param('userId') userId: string, @Param('id') id: string) {
    return this.jobService.deleteEmployerJob(userId, id);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle job active status' })
  @ApiResponse({ status: 200, description: 'Job status toggled successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async toggleJobActive(@Param('id') id: string) {
    return this.jobService.toggleJobActive(id);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active jobs' })
  @ApiResponse({ status: 200, description: 'List of active jobs' })
  async getActiveJobs() {
    return this.jobService.getActiveJobs();
  }
}
