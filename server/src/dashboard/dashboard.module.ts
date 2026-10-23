import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JobCategoryService } from '../job-category/job-category.service';
import { JobService } from '../jobs/jobs.service';
import { ApplicationService } from '../application/application.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [DashboardController],
  providers: [DashboardService, PrismaService, JobCategoryService, JobService, ApplicationService],
})
export class DashboardModule {}
