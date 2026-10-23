import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateJobSeekerUserDto } from './dto/update-jobseeker-user.dto';
import { UpdateEmployerUserDto } from './dto/update-employer-user.dto';
import { MailService } from 'src/mail/mail.service';
import { Prisma } from '@prisma/client';
import { BaseService } from '../common/base.service';

@Injectable()
export class UserService extends BaseService {
  constructor(
    protected readonly prisma: PrismaService,
    private mailService: MailService,
  ) {
    super(prisma);
  }

  async getEmployersWithDetails(search = '', page = 1, limit = 10) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Where clause with proper Prisma types
    const where: Prisma.UserWhereInput = this.addSoftDeleteFilter({
      role: 'employer',
      OR: search
        ? [
            { email: { contains: search, mode: 'insensitive' as const } },
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName: { contains: search, mode: 'insensitive' as const } },
            {
              employer: {
                OR: [
                  {
                    companyName: {
                      contains: search,
                      mode: 'insensitive' as const,
                    },
                  },
                  {
                    companyIndustry: {
                      contains: search,
                      mode: 'insensitive' as const,
                    },
                  },
                ],
              },
            },
          ]
        : undefined,
    });

    // Main query with proper typing for included relations
    const users = await this.prisma.user.findMany({
      where,
      skip,
      take: Number(limit),
      include: {
        employer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Count total matching records
    const total = await this.prisma.user.count({ where });

    const formattedEmployers = users.map((user) => {
      const employerData = user.employer
        ? {
            employerId: user.employer.id,
            companyName: user.employer.companyName,
            companyLogo: user.employer.companyLogo,
            companyWebsite: user.employer.companyWebsite,
            companyDescription: user.employer.companyDescription,
            identityProof: user.employer.identityProof,
            companyType: user.employer.companyType,
            companySize: user.employer.companySize,
            companyIndustry: user.employer.companyIndustry,
            companyLocation: user.employer.companyLocation,
            companyCity: user.employer.companyCity,
            companyState: user.employer.companyState,
            companyPincode: user.employer.companyPincode,
            companyAddress: user.employer.companyAddress,
            companyPhone: user.employer.companyPhone,
            companyEmail: user.employer.companyEmail,
            contactPerson: user.employer.contactPerson,
            full_name: user.employer.full_name,
            designation: user.employer.designation,
            employee_id: user.employer.employee_id,
            authorization_letter: user.employer.authorization_letter,
            business_card: user.employer.business_card,
            isTrust: user.employer.isTrust,
          }
        : {};

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        status: user.status,
        isActive: user.isactive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        ...employerData,
      };
    });

    return {
      data: formattedEmployers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getJobSeekersWithDetails(search = '', page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const searchConditions = search ? [
      { email: { contains: search, mode: 'insensitive' } },
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      {
        jobSeeker: {
          AND: [
            { isDeleted: { not: true } },
            {
              OR: [
                { skills: { hasSome: [search] } },
                { city: { contains: search, mode: 'insensitive' } },
              ],
            },
          ],
        },
      },
    ] : undefined;

    // Main query to get job seekers with their details
    const users = await this.prisma.user.findMany({
      where: this.addSoftDeleteFilter({
        role: 'job_seeker',
        jobSeeker: {
          isDeleted: { not: true },
        },
        ...(searchConditions && { OR: searchConditions }),
      }),
      skip,
      take: limit,
      include: {
        jobSeeker: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Count total matching records
    const total = await this.prisma.user.count({
      where: this.addSoftDeleteFilter({
        role: 'job_seeker',
        jobSeeker: {
          isDeleted: { not: true },
        },
        ...(searchConditions && { OR: searchConditions }),
      }),
    });

    // Transform the data to include both user and job seeker details
    const formattedUsers = users
      .filter(user => user.jobSeeker && !user.jobSeeker.isDeleted)
      .map((user) => ({
        id: user.jobSeeker?.id || user.id,
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        status: user.status,
        isActive: user.isactive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        ...user.jobSeeker, // Spread all jobSeeker properties
      }));

    return {
      data: formattedUsers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getAllJobSeeker() {
    try {
      const jobSeekers = await this.prisma.user.findMany({
        where: this.addSoftDeleteFilter({
          role: 'job_seeker',
        }),
        include: {
          jobSeeker: true, // Include the jobSeeker relation
        },
      });

      // Transform the data to return only required fields
      const formattedJobSeekers = jobSeekers
        .map((user) => ({
          id: user.jobSeeker?.id,
          username: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        }))
        .filter((js) => js.id); // Filter out entries without jobSeeker.id

      return formattedJobSeekers;
    } catch (error) {
      console.error('Error in get jobseekers:', error);
      throw new InternalServerErrorException('Failed to retrieve job seekers');
    }
  }

  async updateActiveStatus(id: string, isactive: boolean) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { isactive },
    });

    // Send email notification
    const emailSubject = isactive
      ? 'Account Activation'
      : 'Account Deactivation';
    const emailMessage = isactive
      ? 'Your account has been activated successfully!'
      : 'Your account has been deactivated. Please contact support for further details.';
    const emailBody = isactive
      ? 'Your profile is under verification. We will notify you once the process is complete.'
      : 'If you believe this is a mistake, please reach out to our support team.';

    await this.mailService.sendUserConfirmation(
      user.email,
      user.firstName || user.username || 'User',
      emailMessage,
      emailSubject,
      emailBody,
    );

    return { message: `User ${isactive ? 'activated' : 'deactivated'}`, user };
  }

  async updateUserWithJobSeeker(id: string, dto: UpdateJobSeekerUserDto) {
    const {
      resume,
      skills,
      experience,
      education,
      city,
      highestEducation,
      phoneNumber,
      gender,
      workStatus,
      location,
      preferredLocations,
      preferredSalary,
      ...userData
    } = dto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        jobSeeker: {
          update: {
            resume,
            skills,
            experience,
            education,
            city,
            highestEducation,
            phoneNumber,
            gender,
            workStatus,
            location,
            preferredLocations: Array.isArray(preferredLocations)
              ? preferredLocations
              : preferredLocations ? [preferredLocations] : [],
            preferredSalary: preferredSalary || '',
          },
        },
      },
      include: { jobSeeker: true },
    });
  }

  async updateUserWithEmployer(id: string, dto: UpdateEmployerUserDto) {
    const {
      companyEmail,
      companyAddress,
      companyCity,
      companyState,
      companyPincode,
      full_name,
      designation,
      employee_id,
      authorization_letter,
      business_card,
      companyName,
      companyLogo,
      contactPerson,
      companyDescription,
      companyWebsite,
      companyLocation,
      companyIndustry,
      companySize,
      companyPhone,
      identityProof,
      companyType,
      isVerified,
      ...userData
    } = dto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        employer: {
          update: {
            companyEmail,
            companyAddress,
            companyState,
            companyCity,
            companyPincode,
            full_name,
            designation,
            employee_id,
            authorization_letter,
            business_card,
            companyName,
            companyLogo,
            contactPerson,
            companyDescription,
            companyWebsite,
            companyLocation,
            companyIndustry,
            companySize,
            companyPhone,
            identityProof,
            companyType,
          },
        },
      },
      include: { employer: true },
    });
  }

  async deleteJobSeeker(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user || user.role !== 'job_seeker') {
      throw new NotFoundException('Job seeker not found or invalid role');
    }

    await this.softDelete('user', id);
    return { message: 'Job seeker deleted successfully' };
  }

  async deleteEmployer(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user || user.role !== 'employer') {
      throw new NotFoundException('Employer not found or invalid role');
    }

    await this.softDelete('user', id);
    return { message: 'Employer deleted successfully' };
  }

  async getJobSeekerById(id: string) {
    try {
      // Find the job seeker with associated user data
      const jobSeeker = await this.prisma.jobSeeker.findUnique({
        where: { 
          id,
          isDeleted: { not: true },
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phoneNumber: true,
              profilePicture: true,
              isactive: true,
              role: true,
              status: true,
              createdAt: true,
              updatedAt: true,
              isDeleted: true,
            },
          },
        },
      });

      if (!jobSeeker || jobSeeker.isDeleted || !jobSeeker.user || jobSeeker.user.isDeleted) {
        throw new NotFoundException('Job seeker not found');
      }

      // Combine user and job seeker data
      return {
        ...jobSeeker,
        user: jobSeeker.user,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2023') {
          throw new BadRequestException('Invalid ID format');
        }
      }
      throw error;
    }
  }

  getEmployerById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        employer: true,
      },
    });
  }

  getAllSoftDeletedJobSeekers() {
    return this.prisma.jobSeeker.findMany({
      where: { 
        isDeleted: true,
        user: {
          isDeleted: true
        }
      },
      include: {
        user: true,
      },
    });
  }

  getAllSoftDeletedEmployers() {
    return this.prisma.employer.findMany({
      where: { 
        isDeleted: true,
        user: {
          isDeleted: true
        }
      },
      include: {
        user: true,
      },
    });
  }
  async restoreJobSeeker(id: string) {
    const jobSeeker = await this.prisma.jobSeeker.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!jobSeeker || !jobSeeker.isDeleted) {
      throw new NotFoundException('Job seeker not found or not deleted');
    }

    await this.prisma.$transaction([
      this.prisma.jobSeeker.update({
        where: { id },
        data: { isDeleted: false },
      }),
      this.prisma.user.update({
        where: { id: jobSeeker.userId },
        data: { isDeleted: false },
      }),
    ]);

    return { message: 'Job seeker restored successfully' };
  }
  async restoreEmployer(id: string) {
    const employer = await this.prisma.employer.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!employer || !employer.isDeleted) {
      throw new NotFoundException('Employer not found or not deleted');
    }

    await this.prisma.$transaction([
      this.prisma.employer.update({
        where: { id },
        data: { isDeleted: false },
      }),
      this.prisma.user.update({
        where: { id: employer.userId },
        data: { isDeleted: false },
      }),
    ]);

    return { message: 'Employer restored successfully' };
  }
}
