// src/interview/interview.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';

@Injectable()
export class InterviewService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateInterviewDto) {
    return this.prisma.interview.create({ data });
  }

  findAll() {
    return this.prisma.interview.findMany({
      include: { application: true },
    });
  }

  findOne(id: string) {
    return this.prisma.interview.findUnique({
      where: { id },
      include: { application: true },
    });
  }

  update(id: string, data: UpdateInterviewDto) {
    return this.prisma.interview.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.interview.delete({
      where: { id },
    });
  }
}
