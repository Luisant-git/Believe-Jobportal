import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';


import { GenAiModule } from './gen-ai/gen-ai.module';

import { HttpExceptionFilter } from './filters/http-exception.filter';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JobModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';





import { JobCategoryModule } from './job-category/job-category.module';
import { ApplicationModule } from './application/application.module';
import { InterviewModule } from './interview/interview.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { EmployerModule } from './employer/employer.module';
import { CompanyDetailsModule } from './company/company.module';
import { JobSeekerModule } from './job_seeker/job_seeker.module';
import { MailModule } from './mail/mail.module';
import { JobAuditInterceptor } from './common/interceptors/job-audit.interceptor';
import { SubscriptionModule } from './subscription/subscription.module';
import { PosterModule } from './poster/poster.module';
import { BannerModule } from './banner/banner.module';
import { EnquiryModule } from './enquiry/enquiry.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    MailModule,
    
    PrismaModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ScheduleModule.forRoot(),
    GenAiModule,
    JobModule,
    AuthModule,
    JobCategoryModule,
    ApplicationModule,
    InterviewModule,
    NotificationModule,
    UserModule,
    EmployerModule,
    SubscriptionModule,
    // CompanyDetailsModule,
    JobSeekerModule,
    PosterModule,
    BannerModule,
    EnquiryModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: JobAuditInterceptor,
    },
  ],
})
export class AppModule {}
