import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateJobSeekerDto } from './dto/update-job-seeker.dto';

@Injectable()
export class JobSeekerService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.jobSeeker.findMany({ 
      where: { isDeleted: false },
      include: { user: true } 
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateJobSeekerDto) {
    await this.findOneOrFail(id);
    return this.prisma.jobSeeker.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const jobSeeker = await this.findOneOrFail(id);
    const userId = jobSeeker.userId;
    
    // Soft delete both jobSeeker and related user
    return this.prisma.$transaction(async (prisma) => {
      await prisma.jobSeeker.update({ 
        where: { id }, 
        data: { isDeleted: true } 
      });
      
      return prisma.user.update({ 
        where: { id: userId }, 
        data: { isDeleted: true } 
      });
    });
  }

  private async findOneOrFail(id: string) {
    const seeker = await this.prisma.jobSeeker.findUnique({ 
      where: { id, isDeleted: false } 
    });
    if (!seeker)
      throw new NotFoundException(`JobSeeker with ID ${id} not found`);
    return seeker;
  }
}
