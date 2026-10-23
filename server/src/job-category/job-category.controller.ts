// src/job-category/job-category.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  UseInterceptors,
  HttpStatus,
  Res,
  HttpException,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JobCategoryService } from './job-category.service';
import {
  CreateJobCategoryDto,
  UpdateJobCategoryDto,
} from './dto/job-category.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { JobAuditInterceptor } from 'src/common/interceptors/job-audit.interceptor';
import { Response } from 'express'; // Correct import for Express Response

@ApiTags('Job Categories')
@Controller('job-categories')
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(JobAuditInterceptor)
  @Roles(Role.admin, Role.super_admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new job category' })
  @ApiResponse({
    status: 201,
    description: 'The job category has been successfully created.',
    type: CreateJobCategoryDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoryService.create(createJobCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all job categories with pagination and search',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by category name',
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ) {
    return this.jobCategoryService.findAll(page, limit, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job category by ID' })
  @ApiParam({
    name: 'id',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    description: 'UUID of the job category',
  })
  @ApiResponse({
    status: 200,
    description: 'The found job category',
    type: CreateJobCategoryDto,
  })
  @ApiResponse({ status: 404, description: 'Job category not found' })
  async findOne(@Param('id') id: string) {
    return this.jobCategoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(JobAuditInterceptor)
  @Roles(Role.admin, Role.super_admin)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a job category' })
  @ApiParam({
    name: 'id',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    description: 'UUID of the job category',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated job category',
    type: CreateJobCategoryDto,
  })
  @ApiResponse({ status: 404, description: 'Job category not found' })
  async update(
    @Param('id') id: string,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    return this.jobCategoryService.update(id, updateJobCategoryDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job category' })
  @ApiParam({
    name: 'id',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    description: 'UUID of the job category',
  })
  @ApiResponse({
    status: 200,
    description: 'The job category has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Job category not found' })
  async remove(@Param('id') id: string) {
    return this.jobCategoryService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiBearerAuth()
  @Delete(':id/soft-delete')
  @ApiOperation({ summary: 'Soft delete a job category' })
  @ApiParam({
    name: 'id',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    description: 'UUID of the job category',
  })
  @ApiResponse({
    status: 200,
    description: 'The job category has been successfully soft deleted',
  })
  @ApiResponse({ status: 404, description: 'Job category not found' })
  async softDelete(@Param('id') id: string) {
    return this.jobCategoryService.softDeleteCategory(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put(':id/restore')
  @ApiOperation({ summary: 'Restore a soft deleted job category' })
  @ApiParam({
    name: 'id',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    description: 'UUID of the job category',
  })
  @ApiResponse({
    status: 200,
    description: 'The job category has been successfully restored',
  })
  @ApiResponse({ status: 404, description: 'Job category not found' })
  async restore(@Param('id') id: string) {
    return this.jobCategoryService.restore(id);
  }

  @Get('/data/lookup')
  @ApiOperation({ summary: 'Get all job categories for lookup' })
  @ApiResponse({
    status: 200,
    description: 'List of job categories',
    type: [CreateJobCategoryDto],
  })
  async lookup() {
    return this.jobCategoryService.lookup();
  }

  @Post(':userId')
  @ApiOperation({ summary: 'Create a new job category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async createCategory(
    @Param('userId') userId: string,
    @Body() dto: CreateJobCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.jobCategoryService.createCategory(dto, userId);
      return res.status(201).json(result);
    } catch (error: any) {
      return res
        .status(typeof error.status === 'number' ? error.status : 500)
        .json({
          message: error.message || 'Failed to create job category',
        });
    }
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get job categories by user ID',
    description: 'Retrieves all job categories associated with a specific user',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user whose categories to retrieve',
    example: '9136811d-49ed-4a85-97fe-74bd09d67283',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved job categories',
  })
  @ApiResponse({
    status: 404,
    description: 'No categories found for this user',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getCategoriesByUser(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.jobCategoryService.getCategory(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      const status = error instanceof NotFoundException ? 404 : 500;
      return res.status(status).json({ message: error.message });
    }
  }

  @Patch(':id/:userId')
  @ApiOperation({ summary: 'Update a job category by ID and userId' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async updateCategory(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateJobCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.jobCategoryService.updateCategory(
        id,
        dto,
        userId,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      return res
        .status(
          typeof error.status === 'number'
            ? error.status
            : HttpStatus.INTERNAL_SERVER_ERROR,
        )
        .json({ message: error.message || 'Failed to update job category' });
    }
  }

  @Delete(':id/:userId')
  @ApiOperation({ summary: 'Delete a job category by ID and userId' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async deleteCategory(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.jobCategoryService.deleteCategory(id, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      return res
        .status(
          typeof error.status === 'number'
            ? error.status
            : HttpStatus.INTERNAL_SERVER_ERROR,
        )
        .json({ message: error.message || 'Failed to delete job category' });
    }
  }
}
