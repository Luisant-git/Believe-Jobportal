import {
  Controller,
  Get,
  Query,
  Param,
  Patch,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { ToggleUserStatusDto } from './dto/toggle-user-status.dto';
import { UpdateJobSeekerUserDto } from './dto/update-jobseeker-user.dto';
import { UpdateEmployerUserDto } from './dto/update-employer-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('jobseekers')
  @ApiOperation({ summary: 'Get all job seekers with pagination and search' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getJobSeekers(
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userService.getJobSeekersWithDetails(search, page, limit);
  }

  @Get('employers')
  @ApiOperation({ summary: 'Get all employers with pagination and search' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getEmployers(
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.userService.getEmployersWithDetails(search, page, limit);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Activate or deactivate a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: ToggleUserStatusDto })
  toggleActiveStatus(
    @Param('id') id: string,
    @Body() dto: ToggleUserStatusDto,
  ) {
    return this.userService.updateActiveStatus(id, dto.isactive);
  }

  @Patch(':id/jobseeker')
  @ApiOperation({ summary: 'Update a user along with job seeker fields' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateJobSeekerUserDto })
  updateUserWithJobSeeker(
    @Param('id') id: string,
    @Body() dto: UpdateJobSeekerUserDto,
  ) {
    return this.userService.updateUserWithJobSeeker(id, dto);
  }

  @Patch(':id/employer')
  @ApiOperation({ summary: 'Update a user along with employer fields' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateEmployerUserDto })
  updateUserWithEmployer(
    @Param('id') id: string,
    @Body() dto: UpdateEmployerUserDto,
  ) {
    return this.userService.updateUserWithEmployer(id, dto);
  }

  @Delete('job-seeker/delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a job seeker by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the job seeker to delete',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Job seeker deleted successfully' })
  @ApiResponse({
    status: 404,
    description: 'Job seeker not found or invalid role',
  })
  async deleteJobSeeker(@Param('id') id: string) {
    return this.userService.deleteJobSeeker(id);
  }

  @Delete('employer/delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an employer by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the employer to delete',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Employer deleted successfully' })
  @ApiResponse({
    status: 404,
    description: 'Employer not found or invalid role',
  })
  async deleteEmployer(@Param('id') id: string) {
    return this.userService.deleteEmployer(id);
  }

  // --------------------------- EXTRA API FOR JOB SEEKR ----------------------

  @Get('/jobseekers/details')
  @ApiOperation({
    summary: 'Get all job seekers (simplified)',
    description: 'Returns an array of job seekers with only ID and full name',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    schema: {
      example: [
        {
          id: '7f820f8b-f688-484f-87b5-c9c7c879e1d6',
          username: 'John Doe',
        },
      ],
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getAllJobSeekers() {
    try {
      return await this.userService.getAllJobSeeker();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve job seekers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('data/job-seeker/:id')
  @ApiOperation({ summary: 'Get job seeker details by ID' })
  @ApiParam({ name: 'id', description: 'Job Seeker ID' })
  @ApiResponse({ status: 200, description: 'Job seeker details' })
  @ApiResponse({ status: 404, description: 'Job seeker not found' })
  async getJobSeekerById(@Param('id') id: string) {
    return this.userService.getJobSeekerById(id);
  }

  @Get('data/employer/:id') 
  @ApiOperation({ summary: 'Get employer details by ID' })
  @ApiParam({ name: 'id', description: 'Employer ID' })
  @ApiResponse({ status: 200, description: 'Employer details' })
  @ApiResponse({ status: 404, description: 'Employer not found' })
  async getEmployerById(@Param('id') id: string) {
    return this.userService.getEmployerById(id);
  }

  @Get('jobseekers/deleted')
  @ApiOperation({ summary: 'Get all deleted job seekers' })
  @ApiResponse({ status: 200, description: 'List of deleted job seekers' })
  async getAllDeletedJobSeekers() {
    return this.userService.getAllSoftDeletedJobSeekers();
  }
  @Get('employers/deleted')
  @ApiOperation({ summary: 'Get all deleted employers' })
  @ApiResponse({ status: 200, description: 'List of deleted employers' })
  async getAllDeletedEmployers() {
    return this.userService.getAllSoftDeletedEmployers();
  }
  
  @Put('jobseekers/restore/:id')
  @ApiOperation({ summary: 'Restore a soft-deleted job seeker' })
  @ApiParam({ name: 'id', description: 'Job Seeker ID' })
  @ApiResponse({ status: 200, description: 'Job seeker restored successfully' })
  @ApiResponse({ status: 404, description: 'Job seeker not found' })
  async restoreJobSeeker(@Param('id') id: string) {
    return this.userService.restoreJobSeeker(id);
  }

  @Put('employers/restore/:id')
  @ApiOperation({ summary: 'Restore a soft-deleted employer' })
  @ApiParam({ name: 'id', description: 'Employer ID' })
  @ApiResponse({ status: 200, description: 'Employer restored successfully' })
  @ApiResponse({ status: 404, description: 'Employer not found' })
  async restoreEmployer(@Param('id') id: string) {
    return this.userService.restoreEmployer(id);
  }
}
