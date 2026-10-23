// employer.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { EmployerFilterDto } from './dto/employer-filter.dto';

@Injectable()
export class EmployerService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    activeOnly: boolean = true,
    search: string = '',
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    return this.prisma.user.findMany({
      where: {
        role: 'employer',
        isDeleted: { not: true },
        employer: {
          isDeleted: { not: true },
          AND: [
            activeOnly ? { isactive: true } : {},
            search
              ? {
                  OR: [
                    { companyName: { contains: search, mode: 'insensitive' } },
                    {
                      companyLocation: { contains: search, mode: 'insensitive' },
                    },
                    { companyEmail: { contains: search, mode: 'insensitive' } },
                    { companyPhone: { contains: search } },
                  ],
                }
              : {},
          ],
        },
      },
      include: {
        employer: true,
      },
      skip,
      take: limit,
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findFirst({
      where: {
        role: 'employer',
        isDeleted: { not: true },
        employer: {
          id,
          isDeleted: { not: true },
        },
      },
      include: {
        employer: true,
      },
    });
  }

  async update(id: string, updateEmployerDto: UpdateEmployerDto) {
    return this.prisma.employer.update({
      where: { id },
      data: updateEmployerDto,
    });
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (tx) => {
      // Find the employer and user
      const employer = await tx.employer.findUnique({
        where: { id },
        include: { user: true }
      });
      
      if (!employer) {
        throw new Error('Employer not found');
      }
      
      // Soft delete the employer record
      await tx.employer.update({
        where: { id },
        data: { isDeleted: true, updatedAt: new Date() }
      });
      
      // Soft delete the user
      await tx.user.update({
        where: { id: employer.userId },
        data: { isDeleted: true, updatedAt: new Date() }
      });
      
      return { success: true };
    });
  }

  async deactivate(id: string) {
    return this.prisma.employer.update({
      where: { id },
      data: { isactive: false },
    });
  }

  async activate(id: string) {
    return this.prisma.employer.update({
      where: { id },
      data: { isactive: true },
    });
  }

  async getActiveEmployers() {
    return this.prisma.user.findMany({
      where: {
        role: 'employer',
        isDeleted: { not: true },
        employer: {
          isactive: true,
          isDeleted: { not: true },
        },
      },
      include: {
        employer: true,
      },
    });
  }

  async getInactiveEmployers() {
    return this.prisma.user.findMany({
      where: {
        role: 'employer',
        isDeleted: { not: true },
        employer: {
          isactive: false,
          isDeleted: { not: true },
        },
      },
      include: {
        employer: true,
      },
    });
  }

  async toggleTrust(id: string) {
    console.log('Attempting to toggle trust for employer ID:', id);
    
    const employer = await this.prisma.employer.findFirst({
      where: {
        id,
        isDeleted: { not: true },
      },
    });
    
    if (!employer) {
      throw new Error(`Employer with ID ${id} not found`);
    }
    
    console.log('Current trust status:', employer.isTrust);
    
    return this.prisma.employer.update({
      where: { id },
      data: {
        isTrust: !employer.isTrust,
        updatedAt: new Date(),
      },
    });
  }

  async getTrustedEmployers() {
    return this.prisma.user.findMany({
      where: {
        role: 'employer',
        isDeleted: { not: true },
        employer: {
          isTrust: true,
          isDeleted: { not: true },
        },
      },
      include: {
        employer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
