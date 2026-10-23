// mail.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Mail')
@Controller('mail')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.admin)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('send-email')
  @ApiOperation({ summary: 'Send email' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  @ApiResponse({ status: 500, description: 'Failed to send email' })
  async sendEmail(
    @Query('to') to: string,
    @Query('username') username: string,
    @Query('message') message: string,
    @Query('description') description: string,
    @Query('subject') subject: string,
  ) {
    try {
      await this.mailService.sendUserConfirmation(
        to,
        username,
        message,
        description,
        subject
      );
      return { message: 'Email sent successfully' };
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
