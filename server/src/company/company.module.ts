import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { CompanyDetailsController } from './company.controller';
import { CompanyDetailsService } from './company.service';

@Module({
  imports: [PrismaModule],
  controllers: [CompanyDetailsController],
  providers: [CompanyDetailsService],
  exports: [CompanyDetailsService],
})
export class CompanyDetailsModule {}