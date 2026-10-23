// src/common/interceptors/application-audit.interceptor.ts
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
  export class ApplicationAuditInterceptor implements NestInterceptor {
    private readonly logger = new Logger(ApplicationAuditInterceptor.name);
  
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
  
      // Handle createdBy and updatedBy for application CRUD operations
      switch (request.method) {
        case 'POST':
          request.body.createdBy = userId;
          request.body.updatedBy = userId;
          this.logger.log(`Application createdBy and updatedBy set to: ${userId}`);
          break;
  
        case 'PUT':
        case 'PATCH':
          request.body.updatedBy = userId;
          this.logger.log(`Application updatedBy set to: ${userId}`);
          
          // Special handling for status updates
          if (request.body.status) {
            if (!request.body.statusHistory) {
              request.body.statusHistory = [];
            }
            
            request.body.statusHistory.push({
              status: request.body.status,
              changedBy: userId,
              changedAt: new Date().toISOString(),
              // You can add reason/description if available in request
              reason: request.body.reason,
              description: request.body.description
            });
            
            this.logger.log(`Status history record added for status: ${request.body.status}`);
          }
          break;
      }
  
      return next.handle();
    }
  }