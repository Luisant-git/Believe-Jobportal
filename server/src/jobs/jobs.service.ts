import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JobStatus, JobType } from '@prisma/client';
import { CreateCompanyDetailsDto } from 'src/company/dto/create-company-details.dto';
import { error } from 'console';
import { UpdateJobDto } from './dto/update-job.dto';
import { contains } from 'class-validator';
import { BaseService } from '../common/base.service';

@Injectable()
export class JobService extends BaseService {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  async create(createJobDto: CreateJobDto) {
    try {
      return await this.prisma.job.create({
        data: createJobDto,
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create job');
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    searchTerm?: string,
    filters?: {
      remote?: boolean;
      approved?: boolean;
      jobType?: JobType;
      status?: JobStatus;
    },
  ) {
    try {
      const skip = (page - 1) * limit;
      const where: any = {
        Delete_flg: 0,
      };

      if (searchTerm) {
        where.OR = [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { location: { contains: searchTerm, mode: 'insensitive' } },
          { companyName: { contains: searchTerm, mode: 'insensitive' } },
          { jobCode: { contains: searchTerm, mode: 'insensitive' } },
        ];
      }

      if (filters) {
        if (filters.remote !== undefined) {
          where.remote = filters.remote;
        }
        if (filters.approved !== undefined) {
          where.approved = filters.approved;
        }
        if (filters.jobType) {
          where.type = filters.jobType;
        }
        if (filters.status) {
          where.status = filters.status;
        }
      }

      const [jobs, totalCount] = await Promise.all([
        this.prisma.job.findMany({
          skip,
          take: limit,
          include: {
            applications: {
              where: {
                isDeleted: false,
              },
            },
            tags: true,
            category: true,
            companyDetails: true,
          },
          where,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.job.count({ where }),
      ]);
      const jobsWithUserData = await Promise.all(
        jobs.map(async (job) => {
          const user = job.createdBy
            ? await this.prisma.user.findUnique({
                where: { id: job.createdBy },
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
            ...job,
            createdBy: user,
            applicationCount: job.applications.length,
          };
        }),
      );

      return {
        data: jobsWithUserData,
        meta: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
          filters,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve jobs');
    }
  }

  async findOne(id: string) {
    try {
      const job = await this.prisma.job.findUnique({
        where: { id },
        include: {
          applications: {
            where: {
              isDeleted: false,
            },
          },
          tags: true,
          category: true,
          companyDetails: true,
        },
      });
      if (!job) throw new NotFoundException(`Job with id ${id} not found`);
      return {
        ...job,
        applicationCount: job.applications.length,
      };
    } catch (error) {
      throw new NotFoundException(
        error.message || `Job with id ${id} not found`,
      );
    }
  }

  async update(id: string, updateJobDto: any) {
    await this.findOne(id);
    try {
      return await this.prisma.job.update({
        where: { id },
        data: updateJobDto,
      });
    } catch (error) {
      throw new BadRequestException(
        error.message || `Failed to update job with id ${id}`,
      );
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      return await this.softDelete('job', id);
    } catch (error) {
      throw new BadRequestException(
        error.message || `Failed to delete job with id ${id}`,
      );
    }
  }

  // async searchJobs(filters: {
  //   search?: string;
  //   skills?: string[];
  //   location?: string;
  //   type?: string;
  //   salaryRange?: string;
  //   experience?: string;
  //   categoryId?: string;
  //   remote?: boolean;
  // }) {
  //   const where: any = {
  //     Delete_flg: 0,
  //     status: 'open',
  //     AND: [],
  //   };

  //   if (filters.search) {
  //     const searchTerm = filters.search.trim();
  //     where.AND.push({
  //       OR: [
  //         { title: { contains: searchTerm, mode: 'insensitive' } },
  //         { description: { contains: searchTerm, mode: 'insensitive' } },
  //         { companyName: { contains: searchTerm, mode: 'insensitive' } },
  //         { companyDescription: { contains: searchTerm, mode: 'insensitive' } },
  //         { notes: { contains: searchTerm, mode: 'insensitive' } },
  //       ],
  //     });
  //   }

  //   if (filters.skills && filters.skills.length > 0) {
  //     where.AND.push({
  //       skillsRequired: {
  //         hasSome: filters.skills,
  //       },
  //     });
  //   }

  //   if (filters.location) {
  //     where.AND.push({
  //       location: {
  //         contains: filters.location.trim(),
  //         mode: 'insensitive',
  //       },
  //     });
  //   }

  //   if (filters.type) {
  //     where.AND.push({
  //       type: filters.type,
  //     });
  //   }

  //   if (filters.salaryRange) {
  //     const [minSalary, maxSalary] = filters.salaryRange.split('-').map(Number);

  //     if (!isNaN(minSalary)) {
  //       where.AND.push({
  //         OR: [
  //           {
  //             salaryRange: {
  //               contains: filters.salaryRange,
  //             },
  //           },
  //           {
  //             AND: [
  //               {
  //                 salaryRange: {
  //                   contains: minSalary.toString(),
  //                 },
  //               },
  //               ...(!isNaN(maxSalary)
  //                 ? [
  //                     {
  //                       salaryRange: {
  //                         contains: maxSalary.toString(),
  //                       },
  //                     },
  //                   ]
  //                 : []),
  //             ],
  //           },
  //         ],
  //       });
  //     }
  //   }
  //   if (filters.experience) {
  //     where.AND.push({
  //       experience: {
  //         contains: filters.experience.trim(),
  //         mode: 'insensitive',
  //       },
  //     });
  //   }
  //   if (filters.categoryId) {
  //     where.AND.push({
  //       categoryId: filters.categoryId,
  //     });
  //   }
  //   if (filters.remote !== undefined) {
  //     where.AND.push({
  //       remote: filters.remote,
  //     });
  //   }
  //   if (where.AND.length === 0) {
  //     delete where.AND;
  //   }

  //   return this.prisma.job.findMany({
  //     where,
  //     include: {
  //       category: true,
  //       tags: true,
  //       applications: true,
  //       companyDetails: true,
  //     },
  //   });
  // }

  async searchJobs(filters: {
    search?: string;
    companyName?: string;
    skills?: string[];
    location?: string;
    type?: string;
    salaryRange?: string;
    experience?: string;
    categoryId?: string;
    remote?: boolean;
  }) {
    const where: any = {
      Delete_flg: 0,
      AND: [],
    };

    if (filters.search) {
      const searchTerm = filters.search.trim();
      where.AND.push({
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          // { description: { contains: searchTerm, mode: 'insensitive' } },
          { companyName: { contains: searchTerm, mode: 'insensitive' } },
          // { companyDescription: { contains: searchTerm, mode: 'insensitive' } },
          // { notes: { contains: searchTerm, mode: 'insensitive' } },
        ],
      });
    }

    if (filters.companyName) {
      const companyNameTerm = filters.companyName.trim();
      where.AND.push({
        companyName: { contains: companyNameTerm, mode: 'insensitive' },
      });
    }

    if (filters.skills && filters.skills.length > 0) {
      where.AND.push({
        skillsRequired: {
          hasSome: filters.skills,
        },
      });
    }

    if (filters.location) {
      where.AND.push({
        location: {
          contains: filters.location.trim(),
          mode: 'insensitive',
        },
      });
    }

    if (filters.type) {
      where.AND.push({
        type: filters.type,
      });
    }

    if (filters.salaryRange) {
      const [minSalary, maxSalary] = filters.salaryRange.split('-').map(Number);

      if (!isNaN(minSalary)) {
        where.AND.push({
          OR: [
            {
              salaryRange: {
                contains: filters.salaryRange,
              },
            },
            {
              AND: [
                {
                  salaryRange: {
                    contains: minSalary.toString(),
                  },
                },
                ...(!isNaN(maxSalary)
                  ? [
                      {
                        salaryRange: {
                          contains: maxSalary.toString(),
                        },
                      },
                    ]
                  : []),
              ],
            },
          ],
        });
      }
    }
    if (filters.experience) {
      where.AND.push({
        experience: {
          contains: filters.experience.trim(),
          mode: 'insensitive',
        },
      });
    }
    if (filters.categoryId) {
      where.AND.push({
        categoryId: filters.categoryId,
      });
    }
    if (filters.remote !== undefined) {
      where.AND.push({
        remote: filters.remote,
      });
    }
    if (where.AND.length === 0) {
      delete where.AND;
    }

    const jobs = await this.prisma.job.findMany({
      where,
      include: {
        category: true,
        tags: true,
        applications: {
          where: {
            isDeleted: false,
          },
        },
        companyDetails: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return jobs.map(job => ({
      ...job,
      applicationCount: job.applications.length,
    }));
  }

  async getAllSkills() {
    try {
      const jobs = await this.prisma.job.findMany({
        select: {
          skillsRequired: true,
        },
        where: {
          Delete_flg: 0,
          skillsRequired: {
            isEmpty: false,
          },
        },
      });
      const allSkills = jobs.flatMap((job) => job.skillsRequired);
      const uniqueSkills = [...new Set(allSkills)]
        .filter((skill) => skill.trim() !== '')
        .sort()
        .map((skill) => ({ name: skill }));

      return uniqueSkills;
    } catch (error) {
      console.error('Error in getAllSkills:', error);
      throw new InternalServerErrorException('Failed to retrieve skills');
    }
  }

  async getAllTitles() {
    const jobs = await this.prisma.job.findMany({
      select: {
        title: true,
      },
      where: {
        Delete_flg: 0,
        status: 'open',
        title: {
          notIn: ['', ' '],
        },
      },
    });

    const allTitles = jobs
      .map((job) => job.title.trim())
      .filter((title) => title !== '');

    const uniqueTitles = [...new Set(allTitles)]
      .sort()
      .map((title) => ({ name: title }));

    return uniqueTitles;
  }

  async getAllLocations() {
    try {
      const jobs = await this.prisma.job.findMany({
        select: {
          location: true,
        },
        where: {
          Delete_flg: 0,
          location: {
            notIn: ['', ' '],
          },
        },
      });

      const allLocations = jobs
        .map((job) => job.location.trim())
        .filter((location) => location !== '');

      const uniqueLocations = [...new Set(allLocations)]
        .sort()
        .map((location) => ({ name: location }));

      return uniqueLocations;
    } catch (error) {
      console.error('Error in getAllLocations:', error);
      throw new InternalServerErrorException('Failed to retrieve locations');
    }
  }

  async updateJobStatus(id: string, status: JobStatus) {
    try {
      const job = await this.prisma.job.findUnique({ where: { id } });
      if (!job) {
        throw new NotFoundException(`Job with id ${id} not found`);
      }

      return await this.prisma.job.update({
        where: { id },
        data: { status },
      });
    } catch (error) {
      throw new BadRequestException(
        error.message || `Failed to update status for job with id ${id}`,
      );
    }
  }

  async joblookup() {
    try {
      const jobs = await this.prisma.job.findMany({
        where: {
          Delete_flg: 0,
          status: 'open',
        },
        select: {
          id: true,
          title: true,
          jobCode: true,
        },
      });

      return jobs;
    } catch (error) {
      console.error('Error in joblookup:', error);
      throw new InternalServerErrorException('Failed to retrieve jobs');
    }
  }

  //--------------------- BY EMPLOYEER JOB -------------

  async createEmployerjobs(createJobDto: CreateJobDto, userId?: string) {
    // 1. Validate category
    const category = await this.prisma.jobCategory.findUnique({
      where: { id: createJobDto.categoryId },
    });
    if (!category) {
      throw new BadRequestException('Invalid category specified');
    }

    // 2. Validate company if provided
    if (createJobDto.companyId) {
      const company = await this.prisma.employer.findUnique({
        where: { id: createJobDto.companyId },
      });
      if (!company) {
        throw new BadRequestException('Invalid company specified');
      }
    }

    // 3. Get employer's job limit from subscription
    const employer = await this.prisma.employer.findUnique({
      where: { userId: userId },
      include: { subscription: true },
    });
    const subscription = employer?.subscription;
    const jobLimit = subscription?.jobLimit || 0;
    console.log('Job Limit from subscription@@@@@@@@@@:', jobLimit);

    // check if employer has an active subscription
    if (!subscription || !subscription.isActive) {
      throw new BadRequestException(
        `Your subscription is not active. Please renew or upgrade your subscription to post jobs.`,
      );
    }

    // Check subscription validity based on startDate and endDate
    const now = new Date();
    if (
      !subscription ||
      now < subscription.startDate ||
      now > subscription.endDate
    ) {
      throw new BadRequestException(
        `Your subscription is not active. Please renew or upgrade your subscription to post jobs.`,
      );
    }

    // 4. Count current active jobs for this employer within subscription period
    const currentJobCount = await this.prisma.job.count({
      where: {
        userId: userId,
        createdAt: {
          gte: subscription.startDate,
          lte: subscription.endDate,
        },
      },
    });
    console.log('Current job count:', currentJobCount);

    // If you also want to count applications within the subscription period:
    const currentApplicationCount = await this.prisma.application.count({
      where: {
        job: {
          userId: userId,
          Delete_flg: 0,
          createdAt: {
            gte: subscription.startDate,
            lte: subscription.endDate,
          },
        },
        createdAt: {
          gte: subscription.startDate,
          lte: subscription.endDate,
        },
      },
    });
    console.log('Current application count:', currentApplicationCount);

    // 5. Enforce job limit
    if (jobLimit === 0) {
      throw new BadRequestException(
        `You cannot post jobs. Please upgrade your subscription to enable job posting.`,
      );
    }
    if (jobLimit > 0 && currentJobCount >= jobLimit) {
      throw new BadRequestException(
        `You have reached your job posting limit (${jobLimit}). Please upgrade your subscription.`,
      );
    }

    // 6. Create the job
    try {
      return await this.prisma.job.create({
        data: {
          ...createJobDto,
          createdBy: userId,
          userId: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create job');
    }
  }

  // async employerAddedJobsOnly(userId: string) {
  //   try {
  //     const jobs = await this.prisma.job.findMany({
  //       where: {
  //         userId: userId,
  //       },
  //       include: {
  //         applications: true,
  //         tags: true,
  //         category: true,
  //         companyDetails: true,
  //       },
  //       orderBy: {
  //         createdAt: 'desc',
  //       },
  //     });
  //     return jobs;
  //   } catch (error) {
  //     console.error('Error in employerAddedJobsOnly:', error);
  //     throw new InternalServerErrorException('Failed to retrieve jobs');
  //   }
  // }

  async employerAddedJobsOnly(userId: string) {
    if (!userId) throw new BadRequestException('Please login to continue...');
    try {
      const jobs = await this.prisma.job.findMany({
        where: {
          userId: userId,
          Delete_flg: 0,
        },
        include: {
          applications: {
            where: {
              isDeleted: false,
            },
          },
          tags: true,
          category: true,
          companyDetails: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return jobs.map(job => ({
        ...job,
        applicationCount: job.applications.length,
      }));
    } catch (error) {
      console.error('Error in employerAddedJobsOnly:', error);
      throw new InternalServerErrorException('Failed to retrieve jobs');
    }
  }

  async employerJobsGetById(userId: string, id: string) {
    try {
      const job = await this.prisma.job.findUnique({
        where: {
          id: id,
          userId: userId,
        },
        include: {
          applications: {
            where: {
              isDeleted: false,
            },
          },
          tags: true,
          category: true,
          companyDetails: true,
        },
      });

      if (!job) {
        throw new NotFoundException(
          'Job not found or not owned by this employer',
        );
      }

      return {
        ...job,
        applicationCount: job.applications.length,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in employerJobsGetById:', error);
      throw new InternalServerErrorException('Failed to retrieve job');
    }
  }

  async updateEmployerJob(
    userId: string,
    id: string,
    updateJobDto: UpdateJobDto,
  ) {
    // First validate the job exists and belongs to this user
    const existingJob = await this.prisma.job.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingJob) {
      throw new NotFoundException(
        'Job not found or not owned by this employer',
      );
    }

    // Validate category if being updated
    if (updateJobDto.categoryId) {
      const category = await this.prisma.jobCategory.findUnique({
        where: { id: updateJobDto.categoryId },
      });
      if (!category) {
        throw new BadRequestException('Invalid category specified');
      }
    }

    // Validate company if being updated
    if (updateJobDto.companyId) {
      const company = await this.prisma.employer.findUnique({
        where: { id: updateJobDto.companyId },
      });
      if (!company) {
        throw new BadRequestException('Invalid company specified');
      }
    }

    // Define allowed update fields
    const allowedUpdateFields = [
      'title',
      'description',
      'location',
      'type',
      'zipCode',
      'experience',
      'salaryRange',
      'remote',
      'approved',
      'isActive',
      'numberOfPositions',
      'industry',
      'isUrgent',
      'notes',
      'jobCode',
      'skillsRequired',
      'benefits',
      'qualifications',
      'categoryId',
      'status',
      'companyId',
      'companyName',
    ];

    // Filter the update data to only include allowed fields
    const filteredUpdateData = Object.keys(updateJobDto).reduce((acc, key) => {
      if (allowedUpdateFields.includes(key)) {
        acc[key] = updateJobDto[key];
      }
      return acc;
    }, {} as Partial<UpdateJobDto>);

    try {
      return await this.prisma.job.update({
        where: { id: id },
        data: {
          ...filteredUpdateData,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update job');
    }
  }

  // async deleteEmployerJob(userId: string, id: string) {
  //   const existingJob = await this.prisma.job.findUnique({
  //     where: {
  //       id: id,
  //       userId: userId,
  //     },
  //   });

  //   if (!existingJob) {
  //     throw new NotFoundException(
  //       'Job not found or not owned by this employer',
  //     );
  //   }

  //   try {

  //     await this.prisma.statusHistory.deleteMany({
  //       where: { application: { jobId: id } }
  //     }),

  //     await this.prisma.application.deleteMany({
  //       where: { jobId: id },
  //     });

  //     return await this.prisma.job.delete({
  //       where: { id: id },
  //     });
  //   } catch (error) {
  //     console.error('Error in deleteEmployerJob:', error);
  //     throw new InternalServerErrorException('Failed to delete job');
  //   }
  // }

  async deleteEmployerJob(userId: string, id: string) {
    const existingJob = await this.prisma.job.findUnique({
      where: {
        id: id,
        userId: userId,
        Delete_flg: 0, // Ensure the job isn't already deleted
      },
    });

    if (!existingJob) {
      throw new NotFoundException(
        'Job not found or not owned by this employer',
      );
    }

    try {
      // Update the job to mark it as deleted
      return await this.softDelete('job', id);
    } catch (error) {
      console.error('Error in deleteEmployerJob:', error);
      throw new InternalServerErrorException('Failed to delete job');
    }
  }

  async toggleJobActive(id: string) {
    try {
      const job = await this.prisma.job.findUnique({
        where: { id, Delete_flg: 0 },
      });

      if (!job) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }

      return await this.prisma.job.update({
        where: { id },
        data: {
          isActive: !job.isActive,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to toggle job status');
    }
  }

  async getActiveJobs() {
    try {
      const jobs = await this.prisma.job.findMany({
        where: {
          Delete_flg: 0,
          isActive: true,
        },
        include: {
          applications: {
            where: {
              isDeleted: false,
            },
          },
          tags: true,
          category: true,
          companyDetails: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return jobs.map(job => ({
        ...job,
        applicationCount: job.applications.length,
      }));
    } catch (error) {
      console.error('Error in getActiveJobs:', error);
      throw new InternalServerErrorException('Failed to retrieve active jobs');
    }
  }
}
