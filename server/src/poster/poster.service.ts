import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';

@Injectable()
export class PosterService {
  constructor(private prisma: PrismaService) {}

  async create(createPosterDto: CreatePosterDto) {
    return this.prisma.poster.create({
      data: createPosterDto,
    });
  }

  async findAll() {
    return this.prisma.poster.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const poster = await this.prisma.poster.findUnique({
      where: { id },
    });

    if (!poster) {
      throw new NotFoundException(`Poster with ID ${id} not found`);
    }

    return poster;
  }

  async update(id: string, updatePosterDto: UpdatePosterDto) {
    try {
      return await this.prisma.poster.update({
        where: { id },
        data: {
          ...updatePosterDto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Poster with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.poster.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Poster with ID ${id} not found`);
      }
      throw error;
    }
  }

  async toggleActive(id: string) {
    try {
      const poster = await this.prisma.poster.findUnique({
        where: { id },
      });

      if (!poster) {
        throw new NotFoundException(`Poster with ID ${id} not found`);
      }

      return await this.prisma.poster.update({
        where: { id },
        data: {
          isActive: !poster.isActive,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Poster with ID ${id} not found`);
      }
      throw error;
    }
  }

  async getActivePostersOnly() {
    return this.prisma.poster.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
