import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class BannerService extends BaseService {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  async create(createBannerDto: CreateBannerDto) {
    return this.prisma.banner.create({
      data: createBannerDto,
    });
  }

  async findAll() {
    return this.prisma.banner.findMany({
      where: this.addSoftDeleteFilter({}),
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const banner = await this.prisma.banner.findUnique({
      where: this.addSoftDeleteFilter({ id }),
    });
    
    if (!banner) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }
    
    return banner;
  }

  async update(id: string, updateBannerDto: UpdateBannerDto) {
    try {
      return await this.prisma.banner.update({
        where: { id },
        data: {
          ...updateBannerDto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Banner with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.softDelete('banner', id);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Banner with ID ${id} not found`);
      }
      throw error;
    }
  }
  
  async toggleActive(id: string) {
    try {
      const banner = await this.prisma.banner.findUnique({
        where: this.addSoftDeleteFilter({ id }),
      });
      
      if (!banner) {
        throw new NotFoundException(`Banner with ID ${id} not found`);
      }
      
      return await this.prisma.banner.update({
        where: { id },
        data: {
          isActive: !banner.isActive,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Banner with ID ${id} not found`);
      }
      throw error;
    }
  }

  async getActiveBanners() {
    return this.prisma.banner.findMany({
      where: this.addSoftDeleteFilter({
        isActive: true,
      }),
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}