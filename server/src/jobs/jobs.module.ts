
import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { JobController } from './jobs.controller';
import { JobService } from './jobs.service';

@Module({
  controllers: [JobController],
  providers: [JobService, PrismaService],
  exports: [JobService],
})
export class JobModule {}