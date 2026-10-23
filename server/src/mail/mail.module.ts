// mail.module.ts
import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GODADDY_EMAIL,
          pass: process.env.GODADDY_PASSWORD,
        },
      },
      defaults: {
        from: process.env.GODADDY_EMAIL,
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
