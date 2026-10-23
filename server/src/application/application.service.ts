import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { AppStatus } from '@prisma/client';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { MailService } from 'src/mail/mail.service';
import { BaseService } from '../common/base.service';

@Injectable()
export class ApplicationService extends BaseService {
  constructor(
    protected prisma: PrismaService,
    private mailService: MailService,
  ) {
    super(prisma);
  }

  async create(userId: string, data: CreateApplicationDto) {
    try {
      return await this.prisma.application.create({
        data: {
          ...data,
          userId: userId,
          // user: { connect: { id: userId } }
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('Duplicate entry detected');
      }
      throw new Error('Failed to create application');
    }
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    status?: AppStatus,
    minSalary?: number,
    maxSalary?: number,
  ) {
    const skip = (page - 1) * limit;

    const whereClause: any = this.addSoftDeleteFilter({
      ...(status ? { status } : {}),
    });
    whereClause.job = {
      AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { companyName: { contains: search, mode: 'insensitive' } },
                  { jobCode: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
        ],
      };

    if (minSalary || maxSalary) {
      whereClause.expectedSalary = {
        ...(minSalary ? { gte: String(minSalary) } : {}),
        ...(maxSalary ? { lte: String(maxSalary) } : {}),
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.application.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          jobSeeker: {
            include: {
              user: true,
            },
          },
          job: true,
          interviews: true,
          tracking: true,
        },
        orderBy: {
          applicationDate: 'desc',
        },
      }),
      this.prisma.application.count({ where: whereClause }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    try {
      const application = await this.prisma.application.findUnique({
        where: this.addSoftDeleteFilter({ id }),
        include: {
          jobSeeker: {
            include: {
              user: true,
            },
          },
          job: true,
          interviews: true,
          tracking: true,
        },
      });

      if (!application) {
        throw new NotFoundException();
      }

      return application;
    } catch (error) {
      throw new Error('Failed to fetch application');
    }
  }

  async update(id: string, data: UpdateApplicationDto) {
    try {
      return await this.prisma.application.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Application not found');
      }
      throw new Error('Failed to update application');
    }
  }

  async remove(id: string) {
    try {
      return await this.softDelete('application', id);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Application not found');
      }
      throw new Error('Failed to delete application');
    }
  }

  async updateStatus(
    applicationId: string,
    updateDto: UpdateApplicationStatusDto,
    userId: string,
  ) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1. First verify the application exists
        const existingApplication = await tx.application.findUnique({
          where: this.addSoftDeleteFilter({ id: applicationId }),
        });

        if (!existingApplication) {
          throw new NotFoundException(
            `Application with ID ${applicationId} not found`,
          );
        }

        // 2. Update the application status
        const application = await tx.application.update({
          where: { id: applicationId },
          data: {
            status: updateDto.status,
            updatedBy: userId,
            ...(updateDto.status === AppStatus.rejected && {
              rejectedDate: new Date().toISOString(),
            }),
            ...(updateDto.status === AppStatus.accepted && {
              selectedDate: new Date().toISOString(),
            }),
            ...(updateDto.status === AppStatus.shortlisted && {
              shortlistedDate: new Date().toISOString(),
            }),
          },
          include: {
            job: true,
            jobSeeker: true,
          },
        });

        // 3. Create status history record
        await tx.statusHistory.create({
          data: {
            status: updateDto.status,
            reason: updateDto.reason,
            description: updateDto.description,
            changedBy: userId,
            applicationId: applicationId,
          },
        });

        // 4. Verify job seeker exists before creating notification
        if (
          updateDto.status === AppStatus.shortlisted ||
          updateDto.status === AppStatus.accepted ||
          updateDto.status === AppStatus.rejected
        ) {
          const jobSeekerExists = await tx.user.findUnique({
            where: { id: application.jobSeekerId },
          });

          if (jobSeekerExists) {
            await tx.notification.create({
              data: {
                message: `Your application for ${application.job.title} has been ${updateDto.status}`,
                type: 'application_status',
                userId: application.jobSeekerId,
              },
            });

            // 5. Send email notification to the user
            await this.mailService.sendUserConfirmation(
              jobSeekerExists.email,
              application.job.title,
              `Your application status has been updated to ${updateDto.status}.`,
              'Application Status Update',
              updateDto.description ||
                'Please check your application for more details.',
            );
          }
        }

        return application;
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Application not found');
      }
      throw error;
    }
  }

  async getApplicationForThatEmployer(userId: string) {
    try {
      // 1. Get employer and candidate limit
      const employer = await this.prisma.employer.findUnique({
        where: { userId },
        include: { subscription: true },
      });
      const candidateLimit = employer?.subscription?.candidateLimit || 0;

      // 2. Get all jobs created by this employer
      const jobs = await this.prisma.job.findMany({
        where: { createdBy: userId },
        select: { id: true },
      });

      // 3. For each job, fetch up to candidateLimit applications
      const allApplications = await Promise.all(
        jobs.map(async (job) => {
          const applications = await this.prisma.application.findMany({
            where: this.addSoftDeleteFilter({ jobId: job.id }),
            include: {
              jobSeeker: { include: { user: true } },
              job: true,
            },
            orderBy: { applicationDate: 'asc' },
            take: candidateLimit > 0 ? candidateLimit : undefined,
          });
          return applications;
        }),
      );

      // 4. Flatten the array of arrays
      return allApplications.flat();
    } catch (error) {
      throw new NotFoundException('Failed to fetch applications');
    }
  }

  async getApplicationsForJobSeeker(userId: string) {
    try {
      const applications = await this.prisma.application.findMany({
        where: this.addSoftDeleteFilter({
          jobSeeker: {
            userId: userId,
          },
        }),
        include: {
          job: true,
        },
        orderBy: {
          applicationDate: 'desc',
        },
      });

      // if (!applications || applications.length === 0) {
      //   throw new NotFoundException(
      //     'No applications found for this job seeker',
      //   );
      // }

      return applications;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Failed to fetch applications');
    }
  }
}
