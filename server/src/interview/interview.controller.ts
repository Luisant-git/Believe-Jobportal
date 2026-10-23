// src/interview/interview.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InterviewService } from './interview.service';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Interviews')
@Controller('interviews')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.employer, Role.job_seeker, Role.super_admin)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new interview' })
  @ApiResponse({ status: 201, description: 'Interview created' })
  create(@Body() dto: CreateInterviewDto) {
    return this.interviewService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all interviews' })
  findAll() {
    return this.interviewService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get interview by ID' })
  findOne(@Param('id') id: string) {
    return this.interviewService.findOne(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.employer, Role.job_seeker, Role.super_admin)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update interview by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateInterviewDto) {
    return this.interviewService.update(id, dto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.employer, Role.job_seeker, Role.super_admin)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete interview by ID' })
  remove(@Param('id') id: string) {
    return this.interviewService.remove(id);
  }
}
