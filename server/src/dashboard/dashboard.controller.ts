import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { OverallCountsDto, EmployerCountsDto } from './dto/dashboard-response.dto';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('counts')
  @ApiOperation({ summary: 'Get overall system counts' })
  @ApiResponse({ status: 200, description: 'Returns counts of categories, jobs, applications, employers, and job seekers', type: OverallCountsDto })
  getOverallCounts() {
    return this.dashboardService.getOverallCounts();
  }

  @Get('employer/:userId')
  @ApiOperation({ summary: 'Get employer-specific counts' })
  @ApiParam({ name: 'userId', description: 'User ID of the employer' })
  @ApiResponse({ status: 200, description: 'Returns employer-specific counts of categories, jobs, and applications', type: EmployerCountsDto })
  getEmployerCounts(@Param('userId') userId: string) {
    return this.dashboardService.getEmployerCounts(userId);
  }
}
