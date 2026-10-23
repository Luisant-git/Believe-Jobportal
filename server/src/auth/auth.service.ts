import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Role, UserStatus, AuthProvider } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  CreateEmployerDto,
  EmployerResponseDto,
} from './dto/create-employer.dto';
import { CreateJobSeekerDto } from './dto/create-jobseeker.dto';
import { RegisterEmployerDto } from './dto/register-employer.dto';
import { RegisterJobSeekerDto } from './dto/register-jobseeker.dto';
import { CreatePasswordDto } from './dto/create-password.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from 'src/mail/mail.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { jobSeeker: true, employer: true, admin: true },
    });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.isDeleted) {
      throw new UnauthorizedException(
        'Account has been deleted. Please contact administration.',
      );
    }
    if (!user.isactive) {
      throw new UnauthorizedException(
        'Your account is inactive. Please contact administration.',
      );
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { passwordHash, ...result } = user;
    return result;
  }

  async adminLogin(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
      include: { admin: true },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.isDeleted) {
      throw new UnauthorizedException(
        'Account has been deleted. Please contact support.',
      );
    }

    if (user.role !== Role.admin && user.role !== Role.super_admin) {
      throw new UnauthorizedException(
        'This login endpoint is only for admins and super admins',
      );
    }

    if (!user.isactive) {
      throw new UnauthorizedException(
        'Account is inactive. Please contact support.',
      );
    }

    const isValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAuthResponse(user);
  }

  async roleSpecificLogin(loginDto: LoginDto, requiredRole: Role) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
      include: {
        jobSeeker: requiredRole === Role.job_seeker,
        employer: requiredRole === Role.employer,
        admin: requiredRole === Role.admin || requiredRole === Role.super_admin,
      },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.isDeleted) {
      throw new UnauthorizedException(
        'Account has been deleted. Please contact support.',
      );
    }

    if (user.role !== requiredRole) {
      throw new UnauthorizedException(
        `This login endpoint is only for ${requiredRole.toLowerCase()}s`,
      );
    }

    if (!user.isactive) {
      throw new UnauthorizedException(
        'Account is inactive. Please contact support.',
      );
    }

    const isValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAuthResponse(user);
  }

  private async generateAuthResponse(user: any) {
    let profileData = {};
    switch (user.role) {
      case Role.admin:
      case Role.super_admin:
        profileData = {
          permissions: user.admin?.permissions || [],
        };
        break;
      case Role.employer:
        profileData = {
          companyId: user.employer?.id,
          companyName: user.employer?.companyName,
          companyLogo: user.employer?.companyLogo,
        };
        break;
      case Role.job_seeker:
        profileData = {
          seekerId: user.jobSeeker?.id,
          resume: user.jobSeeker?.resume,
          skills: user.jobSeeker?.skills || [],
        };
        break;
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      ...profileData,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        ...profileData,
      },
    };
  }

  async validateGoogleUser(googleUser: {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    googleId: string;
  }) {
    let user = await this.prisma.user.findUnique({
      where: { email: googleUser.email },
      include: { jobSeeker: true },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: googleUser.email,
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
          profilePicture: googleUser.picture,
          googleId: googleUser.googleId,
          authProvider: AuthProvider.google,
          role: Role.job_seeker,
          status: UserStatus.active,
          jobSeeker: { create: {} },
        },
        include: { jobSeeker: true },
      });

      if (!user.profilePicture || !user.googleId) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: {
            profilePicture: user.profilePicture || googleUser.picture,
            googleId: user.googleId || googleUser.googleId,
            authProvider: AuthProvider.google,
          },
          include: { jobSeeker: true },
        });
      }
    }

    const token = await this.login(user);
    return {
      ...token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        role: user.role,
        googleId: user.googleId,
        authProvider: user.authProvider,
        jobSeeker: user.jobSeeker,
      },
    };
  }
  async login(user: { id: string; email: string; role: Role }) {
    let specificId: string | null = null;
    if (user.role === Role.job_seeker) {
      const jobSeeker = await this.prisma.jobSeeker.findUnique({
        where: { userId: user.id },
      });
      specificId = jobSeeker?.id || null;
    } else if (user.role === Role.employer) {
      const employer = await this.prisma.employer.findUnique({
        where: { userId: user.id },
      });
      specificId = employer?.id || null;
    } else if (user.role === Role.admin || user.role === Role.super_admin) {
      const admin = await this.prisma.admin.findUnique({
        where: { userId: user.id },
      });
      specificId = admin?.id || null;
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      specificId,
    };

    return { access_token: this.jwtService.sign(payload), user };
  }
  async registerAdmin(data: CreateAdminDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        status: UserStatus.active,
        admin: { create: {} },
      },
    });
  }

  async getAllAdminAndSuperAdmin(page = 1, limit = 25, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = {
      role: {
        in: [Role.admin, Role.super_admin],
      },
      isDeleted: false,
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        include: {
          admin: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { data, total };
  }

  async getAdminandSuperAdminByToken(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        isDeleted: false,
        role: { in: [Role.admin, Role.super_admin] },
      },
      include: {
        admin: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Admin/Super Admin not found');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async getAdminandSuperAdminById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        isDeleted: false,
        role: { in: [Role.admin, Role.super_admin] },
      },
      include: {
        admin: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Admin/Super Admin not found');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async updateAdmin(id: string, data: UpdateAdminDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        isDeleted: false,
        role: { in: [Role.admin, Role.super_admin] },
      },
    });

    if (!user) {
      throw new NotFoundException('Admin/Super Admin not found');
    }

    const updateData: any = {};

    if (data.email) updateData.email = data.email;
    if (data.firstName) updateData.firstName = data.firstName;
    if (data.lastName) updateData.lastName = data.lastName;
    if (data.role) updateData.role = data.role;
    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        admin: true,
      },
    });

    const { passwordHash, ...result } = updatedUser;
    return result;
  }

  async deleteAdmin(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        isDeleted: false,
        role: { in: [Role.admin, Role.super_admin] },
      },
    });

    if (!user) {
      throw new NotFoundException('Admin/Super Admin not found');
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    return { message: 'Admin/Super Admin deleted successfully' };
  }

  async registerEmployer(
    data: CreateEmployerDto,
  ): Promise<EmployerResponseDto> {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const employer = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
        firstName: data.companyName,
        role: Role.employer,
        status: UserStatus.active,
        profilePicture: data.companyLogo,
        lastName: null,
        phoneNumber: null,
        employer: {
          create: {
            companyName: data.companyName,
            contactPerson: data.contactPerson,
            companyLogo: data.companyLogo,
            companyWebsite: data.companyWebsite,
            companyDescription: data.companyDescription,
            identityProof: data.identityProof,
            legal_registration_document: data.legal_registration_document,
            companyType: data.companyType,
            companySize: data.companySize,
            companyIndustry: data.companyIndustry,
            companyLocation: data.companyLocation,
            companyCity: data.companyCity,
            companyState: data.companyState,
            companyPincode: data.companyPincode,
            companyAddress: data.companyAddress,
            companyPhone: data.companyPhone,
            isactive: data.isactive ?? true,
            companyEmail: data.companyEmail,
            full_name: data.full_name,
            designation: data.designation,
            employee_id: data.employee_id,
            authorization_letter: data.authorization_letter,
            business_card: data.business_card,
          },
        },
      },
    });

    await this.mailService.sendUserConfirmation(
      data.email,
      data.companyName,
      'Your belive job account has been activated successfully!',
      'Your belive job account has been activated successfully',
      'Your profile is under verification. We will notify you once the process is complete.',
    );

    return {
      id: employer.id,
    };
  }

  async registerJobSeeker(data: CreateJobSeekerDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const jobSeeker = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        role: Role.job_seeker,
        status: UserStatus.active,
        jobSeeker: {
          create: {
            resume: data.resume,
            skills: data.skills,
            experience: data.experience,
            education: data.education,
            phoneNumber: data.phoneNumber,
            city: data.city,
            highestEducation: data.highestEducation,
            workStatus: data.workStatus,
            preferredLocations: data.preferredLocations,
            preferredSalary: data.preferredSalary,
            gender: data.gender,
            location: data.location,
            current_location: data.current_location,
          },
        },
      },
    });
    await this.mailService.sendUserConfirmation(
      data.email,
      data.firstName,
      'Your belive job account has been created successfully!',
      'Your belive job account has been created successfully!',
      'Your account has been created but is pending verification by an administrator. You will be notified once your account is activated.',
    );

    return jobSeeker;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: forgotPasswordDto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    await this.mailService.sendUserConfirmation(
      user.email,
      user.firstName || 'User',
      `Click the link to reset your password: ${process.env.FRONTEND_URL_MAIN}/reset-password?token=${resetToken}`,
      'Your belive job password reset Link here',
      'You requested a password reset. Click the link above to reset your password.',
    );

    return { message: 'Password reset email sent' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: resetPasswordDto.token,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { message: 'Password reset successfully' };
  }

  async registerEmployerWithoutPassword(data: RegisterEmployerDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new ConflictException('Email already exists');

    const passwordToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 3600000); // 24 hours

    const employer = await this.prisma.user.create({
      data: {
        email: data.email,
        firstName: data.companyName,
        role: Role.employer,
        status: UserStatus.inactive,
        resetToken: passwordToken,
        resetTokenExpiry: tokenExpiry,
        profilePicture: data.companyLogo,
        employer: {
          create: {
            companyName: data.companyName,
            contactPerson: data.contactPerson || '',
            companyLogo: data.companyLogo,
            companyWebsite: data.companyWebsite,
            companyDescription: data.companyDescription,
            identityProof: data.identityProof,
            legal_registration_document: data.legal_registration_document,
            companyType: data.companyType,
            companySize: data.companySize,
            companyIndustry: data.companyIndustry,
            companyLocation: data.companyLocation,
            companyCity: data.companyCity,
            companyState: data.companyState,
            companyPincode: data.companyPincode,
            companyAddress: data.companyAddress,
            companyPhone: data.companyPhone,
            isactive: data.isactive ?? true,
            companyEmail: data.companyEmail,
            full_name: data.full_name,
            designation: data.designation,
            employee_id: data.employee_id,
            authorization_letter: data.authorization_letter,
            business_card: data.business_card,
          },
        },
      },
    });

    await this.mailService.sendUserConfirmation(
      data.email,
      data.companyName,
      `Complete your registration by creating a password: ${process.env.FRONTEND_URL_MAIN}/create-password?token=${passwordToken}`,
      'Complete Your Employer Registration',
      'Click the link above to create your password and activate your account.',
    );

    return { message: 'Registration email sent successfully' };
  }

  async registerJobSeekerWithoutPassword(data: RegisterJobSeekerDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new ConflictException('Email already exists');

    const passwordToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 3600000); // 24 hours

    const jobSeeker = await this.prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: Role.job_seeker,
        status: UserStatus.inactive,
        resetToken: passwordToken,
        resetTokenExpiry: tokenExpiry,
        jobSeeker: {
          create: {
            resume: data.resume,
            skills: data.skills,
            experience: data.experience,
            education: data.education,
            phoneNumber: data.phoneNumber,
            city: data.city,
            highestEducation: data.highestEducation,
            workStatus: data.workStatus,
            preferredLocations: data.preferredLocations,
            preferredSalary: data.preferredSalary,
            gender: data.gender,
            location: data.location,
            current_location: data.current_location,
          },
        },
      },
    });

    await this.mailService.sendUserConfirmation(
      data.email,
      data.firstName,
      `Complete your registration by creating a password: ${process.env.FRONTEND_URL_MAIN}/create-password?token=${passwordToken}`,
      'Complete Your Job Seeker Registration',
      'Click the link above to create your password and activate your account.',
    );

    return { message: 'Registration email sent successfully' };
  }

  async createPassword(createPasswordDto: CreatePasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: createPasswordDto.token,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(createPasswordDto.password, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
        status: UserStatus.active,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { message: 'Password created successfully' };
  }
}
