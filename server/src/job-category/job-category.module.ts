// src/job-category/job-category.module.ts
import { Module } from '@nestjs/common';
import { JobCategoryService } from './job-category.service';
import { JobCategoryController } from './job-category.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JobCategoryController],
  providers: [JobCategoryService],
})
export class JobCategoryModule {}