import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSubscriptionDto) {
    try {
      const startDate = data.startDate ? new Date(data.startDate) : new Date();
      const endDate = new Date(data.endDate);
      const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
      
      const { startDate: _, endDate: __, ...restData } = data;
      const subscription = await this.prisma.subscription.create({
        data: {
          ...restData,
          price: Number(data.price),
          candidateLimit: Number(data.candidateLimit),
          jobLimit: Number(data.jobLimit),
          isActive: false,
          startDate,
          endDate,
          daysLeft,
        },
      });

      return subscription;
    } catch (error) {
      console.error('Subscription creation error:', error);
      
      if (error.code === 'P2002') {
        throw new ConflictException('Employer already has a subscription');
      }
      if (error.code === 'P2003') {
        throw new NotFoundException('Employer not found');
      }
      throw new InternalServerErrorException(`Failed to create subscription: ${error.message}`);
    }
  }

  async findAll() {
    return this.prisma.subscription.findMany({
      include: {
        employer: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.subscription.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateSubscriptionDto) {
    try {
      const updateData: any = { ...data };
      if (data.candidateLimit) {
        updateData.candidateLimit = Number(data.candidateLimit);
      }
      if (data.jobLimit) {
        updateData.jobLimit = Number(data.jobLimit);
      }

      if (data.endDate) {
        const existing = await this.prisma.subscription.findUnique({ where: { id } });
        if (!existing) throw new NotFoundException('Subscription not found');
        updateData.endDate = new Date(data.endDate);
        updateData.daysLeft = Math.max(0, Math.ceil((new Date(data.endDate).getTime() - existing.startDate.getTime()) / (1000 * 60 * 60 * 24)));
      }
      
      return this.prisma.subscription.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Subscription not found');
      }
      throw new InternalServerErrorException('Failed to update subscription');
    }
  }

  async remove(id: string) {
    return this.prisma.subscription.delete({
      where: { id },
    });
  }

  async findByEmployerId(employerId: string) {
    const subscription = await this.prisma.subscription.findFirst({
      where: { employerId: employerId },
    });
    
    return subscription || {};
  }
}