import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
  HttpCode,
  Query,
  Param,
  Put,
  Delete,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { CreateJobSeekerDto } from './dto/create-jobseeker.dto';
import { RegisterEmployerDto } from './dto/register-employer.dto';
import { RegisterJobSeekerDto } from './dto/register-jobseeker.dto';
import { CreatePasswordDto } from './dto/create-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Role } from '@prisma/client';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Admin/Super Admin login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Admin login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login/admin')
  @HttpCode(200)
  async adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.adminLogin(loginDto);
  }

  // Employer Login
  @ApiOperation({ summary: 'Employer login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Employer login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login/employer')
  @HttpCode(200)
  async employerLogin(@Body() loginDto: LoginDto) {
    return this.authService.roleSpecificLogin(loginDto, Role.employer);
  }

  @ApiOperation({ summary: 'Job seeker login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Job seeker login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login/job-seeker')
  @HttpCode(200)
  async jobSeekerLogin(@Body() loginDto: LoginDto) {
    return this.authService.roleSpecificLogin(loginDto, Role.job_seeker);
  }

  @ApiOperation({ summary: 'Register a new admin or super admin' })
  @ApiResponse({
    status: 201,
    description: 'Admin/Super Admin registered successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @Post('register/admin')
  async registerAdmin(@Body() data: CreateAdminDto) {
    return this.authService.registerAdmin(data);
  }

  // controller for get All admin and superadmin
  @ApiOperation({ summary: 'Get all admins and super admins' })
  @ApiResponse({
    status: 200,
    description: 'Returns all admins and super admins',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('admins')
  async getAllAdmins(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 25;
    return this.authService.getAllAdminAndSuperAdmin(pageNum, limitNum, search);
  }

  @ApiOperation({ summary: 'Get current admin/super admin details' })
  @ApiResponse({
    status: 200,
    description: 'Returns admin/super admin details',
  })
  @ApiResponse({ status: 404, description: 'Admin/Super Admin not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // Ensure this is protected by JWT auth
  @Get('admins/me')
  async getCurrentAdmin(@Request() req) {
    // Get ID from decoded JWT token
    const userId = req.user.sub;
    return this.authService.getAdminandSuperAdminByToken(userId);
  }

  @ApiOperation({ summary: 'Get admin/super admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns admin/super admin details',
  })
  @ApiResponse({ status: 404, description: 'Admin/Super Admin not found' })
  @Get('admins/:id')
  async getAdminById(@Param('id') id: string) {
    return this.authService.getAdminandSuperAdminById(id);
  }

  @ApiOperation({ summary: 'Update admin/super admin' })
  @ApiResponse({
    status: 200,
    description: 'Admin/Super Admin updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Admin/Super Admin not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Put('admins/:id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.authService.updateAdmin(id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete admin/super admin' })
  @ApiResponse({
    status: 200,
    description: 'Admin/Super Admin deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Admin/Super Admin not found' })
  @Delete('admins/:id')
  async deleteAdmin(@Param('id') id: string) {
    return this.authService.deleteAdmin(id);
  }

  @ApiOperation({ summary: 'Register a new employer' })
  @ApiResponse({
    status: 201,
    description: 'Employer registered successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @Post('register/employer')
  async registerEmployer(@Body() data: CreateEmployerDto) {
    return this.authService.registerEmployer(data);
  }

  @ApiOperation({ summary: 'Register a new job seeker' })
  @ApiResponse({
    status: 201,
    description: 'Job seeker registered successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @Post('register/job-seeker')
  async registerJobSeeker(@Body() data: CreateJobSeekerDto) {
    return this.authService.registerJobSeeker(data);
  }

  @ApiOperation({ summary: 'Initiate Google OAuth flow' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @ApiOperation({ summary: 'Google OAuth callback' })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { access_token, user } = req.user;

    const allowedDomains = [
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL_MAIN,
    ];

    const frontendUrl = req.query.redirect || process.env.FRONTEND_URL_MAIN;

    if (!allowedDomains.includes(frontendUrl)) {
      return res.status(400).send('Invalid redirect URL');
    }

    const redirectUrl = `${frontendUrl}/auth/success?token=${access_token}&user=${encodeURIComponent(
      JSON.stringify(user),
    )}`;

    return res.redirect(redirectUrl);
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: JwtPayload) {
    return user;
  }

  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @ApiOperation({ summary: 'Reset password with token' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @ApiOperation({ summary: 'Register employer without password' })
  @ApiResponse({ status: 201, description: 'Registration email sent' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @Post('register-employer')
  async registerEmployerWithoutPassword(@Body() data: RegisterEmployerDto) {
    return this.authService.registerEmployerWithoutPassword(data);
  }

  @ApiOperation({ summary: 'Register job seeker without password' })
  @ApiResponse({ status: 201, description: 'Registration email sent' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @Post('register-job-seeker')
  async registerJobSeekerWithoutPassword(@Body() data: RegisterJobSeekerDto) {
    return this.authService.registerJobSeekerWithoutPassword(data);
  }

  @ApiOperation({ summary: 'Create password with token' })
  @ApiResponse({ status: 200, description: 'Password created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  @Post('create-password')
  @HttpCode(200)
  async createPassword(@Body() createPasswordDto: CreatePasswordDto) {
    return this.authService.createPassword(createPasswordDto);
  }
}
