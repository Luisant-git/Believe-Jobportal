import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JobCategoryService } from 'src/job-category/job-category.service';
import { JobService } from 'src/jobs/jobs.service';
import { ApplicationService } from 'src/application/application.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService, private jobCategoryService: JobCategoryService, private jobService: JobService, private applicationService: ApplicationService) {}

  async getOverallCounts() {
    const [categories, jobs, applications, employers, jobSeekers] =
      await Promise.all([
        this.prisma.jobCategory.count({ where: { Delete_flg: 0 } }),
        this.prisma.job.count({ where: { Delete_flg: 0 } }),
        this.prisma.application.count({ where: { isDeleted: false } }),
        this.prisma.employer.count({ where: { isDeleted: false } }),
        this.prisma.jobSeeker.count({ where: { isDeleted: false } }),
      ]);

    return {
      categories,
      jobs,
      applications,
      employers,
      jobSeekers,
    };
  }

  async getEmployerCounts(userId: string) {
    // Get categories by user
    const categoriesList = await this.jobCategoryService.getCategory(userId);
    const categories = Array.isArray(categoriesList)
      ? categoriesList.length
      : 0;

    // Get jobs by employer
    const jobsList = await this.jobService.employerAddedJobsOnly(userId);
    const jobs = Array.isArray(jobsList) ? jobsList.length : 0;

    // Get applications for employer
    const applicationsList =
      await this.applicationService.getApplicationForThatEmployer(userId);
    const applications = Array.isArray(applicationsList)
      ? applicationsList.length
      : 0;

    return {
      categories,
      jobs,
      applications,
    };
  }
}
