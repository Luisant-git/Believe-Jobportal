import {
    Controller, Get, Post, Body, Patch, Param, Delete
  } from '@nestjs/common';

  import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JobSeekerService } from './job_seeker.service';
import { CreateJobSeekerDto } from './dto/create-job-seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job-seeker.dto';
  
  @ApiTags('Job Seekers')
  @Controller('jobseekers')
  export class JobSeekerController {
    constructor(private readonly service: JobSeekerService) {}
  

  
    @Get()
    @ApiOperation({ summary: 'Get all job seekers' })
    findAll() {
      return this.service.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a job seeker by ID' })
    @ApiParam({ name: 'id', type: String })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a job seeker by ID' })
    @ApiParam({ name: 'id', type: String })
    update(@Param('id') id: string, @Body() dto: UpdateJobSeekerDto) {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Soft delete a job seeker by ID' })
    @ApiParam({ name: 'id', type: String })
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }
  