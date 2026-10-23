// src/job-category/job-category.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateJobCategoryDto,
  UpdateJobCategoryDto,
} from './dto/job-category.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class JobCategoryService extends BaseService {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  async create(createJobCategoryDto: CreateJobCategoryDto) {
    return this.prisma.jobCategory.create({
      data: createJobCategoryDto,
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    filters?: { createdBy?: string },
  ) {
    try {
      const skip = (page - 1) * limit;
      const where: any = {
        Delete_flg: 0,
      };

      if (search) {
        where.name = {
          contains: search,
          mode: 'insensitive',
        };
      }

      if (filters?.createdBy) {
        where.createdBy = filters.createdBy;
      }

      const [categories, totalCount] = await Promise.all([
        this.prisma.jobCategory.findMany({
          skip,
          take: limit,
          where,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.jobCategory.count({ where }),
      ]);

      // Fetch user data for each category based on the createdBy field
      const categoriesWithUserData = await Promise.all(
        categories.map(async (category) => {
          const user = category.createdBy
            ? await this.prisma.user.findUnique({
                where: { id: category.createdBy },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                  role: true,
                },
              })
            : null;

          return {
            ...category,
            createdBy: user,
          };
        }),
      );

      return {
        data: categoriesWithUserData,
        meta: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
          filters,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve job categories',
      );
    }
  }
  async findOne(id: string) {
    return this.prisma.jobCategory.findUnique({
      where: this.addSoftDeleteFilter({ id }),
    });
  }

  async update(id: string, updateJobCategoryDto: UpdateJobCategoryDto) {
    return this.prisma.jobCategory.update({
      where: { id },
      data: {
        ...updateJobCategoryDto,
        createdBy: undefined,
      },
    });
  }
  async remove(id: string) {
    return this.softDelete('jobCategory', id);
  }

  async softDeleteCategory(id: string) {
    return this.softDelete('jobCategory', id);
  }

  async restore(id: string) {
    return this.prisma.jobCategory.update({
      where: { id },
      data: { Delete_flg: 0 },
    });
  }
  async lookup() {
    return this.prisma.jobCategory.findMany({
      where: { Delete_flg: 0 },
      include: {
        _count: {
          select: {
            jobs: true,
          },
        },
      },
    });
  }

  // CATEGORY BASED ON USERID
  async createCategory(data: CreateJobCategoryDto, userId?: string) {
    try {
      return await this.prisma.jobCategory.create({
        data: {
          ...data,
          createdBy: userId,
          userId: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create job category',
      );
    }
  }

  async getCategory(userId: string) {
    try {
      const categories = await this.prisma.jobCategory.findMany({
        where: {
          userId: userId,
          Delete_flg: 0,
        },
      });

      if (!categories) {
        throw new NotFoundException('No categories found for this user');
      }

      return categories;
    } catch (error) {
      console.error('Error in getCategory:', error);
      throw error;
    }
  }

  async updateCategory(id: string, dto: UpdateJobCategoryDto, userId: string) {
    try {
      const existing = await this.prisma.jobCategory.findUnique({
        where: { id },
      });

      if (!existing || existing.userId !== userId) {
        throw new NotFoundException('Category not found or access denied');
      }

      return await this.prisma.jobCategory.update({
        where: { id },
        data: {
          ...dto,
          updatedBy: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update category',
      );
    }
  }

  async deleteCategory(id: string, userId: string) {
    try {
      const existing = await this.prisma.jobCategory.findUnique({
        where: { id, Delete_flg: 0 },
      });

      if (!existing || existing.userId !== userId) {
        throw new NotFoundException('Category not found or access denied');
      }

      return await this.softDelete('jobCategory', id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete category',
      );
    }
  }
}
