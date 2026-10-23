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
export class JobAuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(JobAuditInterceptor.name);
  private readonly affectedPaths = ['/jobs', '/job-categories'];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    this.logger.verbose(`Request User: ${JSON.stringify(request.user)}`);

    if (!this.affectedPaths.some((path) => request.path.includes(path))) {
      return next.handle();
    }

    if (!request.user?.userId) {
      this.logger.warn('No user.userId found in request!');
      return next.handle();
    }

    const userId = request.user.userId;

    if (!request.body) {
      return next.handle();
    }

    switch (request.method) {
      case 'POST':
        request.body.createdBy = userId;
        this.logger.log(`Setting createdBy: ${userId}`);
        break;

      case 'PUT':
      case 'PATCH':
        request.body.updatedBy = userId;
        if (request.body.Delete_flg === 1) {
          request.body.deletedBy = userId;
        }
        break;

      case 'DELETE':
        request.body = request.body || {};
        request.body.Delete_flg = 1;
        request.body.deletedBy = userId;
        break;
    }

    return next.handle();
  }
}
