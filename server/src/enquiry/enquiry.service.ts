import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

@Injectable()
export class EnquiryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async createEnquiry(createEnquiryDto: CreateEnquiryDto) {
    const { username, email, mobileno, queries } = createEnquiryDto;

    // Save enquiry to database
    const enquiry = await this.prisma.enquiry.create({
      data: {
        username,
        email,
        mobileno,
        queries,
      },
    });

    // Send email notification
    await this.mailService.sendEnquiryEmail({
      to: 'enquiry@believejobs.com',
      username,
      email,
      mobileno,
      queries: queries || 'No specific queries',
    });

    return {
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry,
    };
  }

  async getEnquiries(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [enquiries, total] = await Promise.all([
      this.prisma.enquiry.findMany({
        where: { isDeleted: false },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.enquiry.count({
        where: { isDeleted: false },
      }),
    ]);

    return {
      success: true,
      data: enquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}