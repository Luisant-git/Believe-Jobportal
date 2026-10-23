import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDetailsDto } from './dto/create-company-details.dto';
import { UpdateCompanyDetailsDto } from './dto/update-company-details.dto';

@Injectable()
export class CompanyDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDetailsDto: CreateCompanyDetailsDto) {
    return this.prisma.companyDetails.create({
      data: createCompanyDetailsDto,
    });
  }

  async findAll(search?: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const totalCount = await this.prisma.companyDetails.count({
      where: {
        Delete_flg: 0,
        OR: search
          ? [
              { companyName: { contains: search, mode: 'insensitive' } },
              { companyCity: { contains: search, mode: 'insensitive' } },
              { companyState: { contains: search, mode: 'insensitive' } },
              { companyEmail: { contains: search, mode: 'insensitive' } },
            ]
          : undefined,
      },
    });

    // Fetch paginated data
    const data = await this.prisma.companyDetails.findMany({
      where: {
        Delete_flg: 0,
        OR: search
          ? [
              { companyName: { contains: search, mode: 'insensitive' } },
              { companyCity: { contains: search, mode: 'insensitive' } },
              { companyState: { contains: search, mode: 'insensitive' } },
              { companyEmail: { contains: search, mode: 'insensitive' } },
            ]
          : undefined,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      totalCount,
      totalPages,
      currentPage: page,
      limit,
    };
  }

  async findOne(id: string) {
    return this.prisma.companyDetails.findUnique({
      where: { id, Delete_flg: 0 },
    });
  }

  async update(id: string, updateCompanyDetailsDto: UpdateCompanyDetailsDto) {
    return this.prisma.companyDetails.update({
      where: { id },
      data: updateCompanyDetailsDto,
    });
  }

  async remove(id: string, deletedBy: number) {
    return this.prisma.companyDetails.update({
      where: { id },
      data: {
        Delete_flg: 1,
        deletedBy: deletedBy.toString(),
      },
    });
  }
  async companyLookup() {
    return this.prisma.companyDetails.findMany({
      where: { Delete_flg: 0 },
      select: {
        id: true,
        companyName: true
      },
    });
  }
}
