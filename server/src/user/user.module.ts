import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[ MailModule]
})
export class UserModule {}
