import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  providers: [ApplicationService],
  controllers: [ApplicationController],
  imports: [MailModule],
})
export class ApplicationModule {}
