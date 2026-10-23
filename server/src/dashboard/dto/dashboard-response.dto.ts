import { ApiProperty } from '@nestjs/swagger';

export class OverallCountsDto {
  @ApiProperty({ description: 'Total number of job categories' })
  categories: number;

  @ApiProperty({ description: 'Total number of jobs' })
  jobs: number;

  @ApiProperty({ description: 'Total number of applications' })
  applications: number;

  @ApiProperty({ description: 'Total number of employers' })
  employers: number;

  @ApiProperty({ description: 'Total number of job seekers' })
  jobSeekers: number;
}

export class EmployerCountsDto {
  @ApiProperty({ description: 'Number of unique categories for employer jobs' })
  categories: number;

  @ApiProperty({ description: 'Total number of jobs posted by employer' })
  jobs: number;

  @ApiProperty({ description: 'Total number of applications received by employer' })
  applications: number;
}