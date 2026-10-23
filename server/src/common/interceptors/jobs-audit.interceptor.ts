// src/common/interceptors/job-audit.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { Request } from 'express';
  
  interface AuthenticatedRequest extends Request {
    user?: {
      userId: string;
      email: string;
      role: string;
    };
  }
  
  @Injectable()
  export class JobsAuditInterceptor implements NestInterceptor {
    private readonly logger = new Logger(JobsAuditInterceptor.name);
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
  
      if (!request.user?.userId) {
        this.logger.warn('No user ID found in request!');
        return next.handle();
      }
  
      const userId = request.user.userId;
  
      if (!request.body) {
        return next.handle();
      }
  
      switch (request.method) {
        case 'POST':
          request.body.createdBy = userId;
          request.body.updatedBy = userId;
          this.logger.log(`Setting createdBy and updatedBy: ${userId}`);
          break;
  
        case 'PUT':
        case 'PATCH':
          request.body.updatedBy = userId;
          this.logger.log(`Setting updatedBy: ${userId}`);
          break;
      }
  
      return next.handle();
    }
  }