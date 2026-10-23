# Soft Delete Implementation

This document outlines the soft delete functionality implemented across all APIs in the backend.

## Overview

Soft delete allows marking records as deleted without physically removing them from the database. This provides data recovery capabilities and maintains referential integrity.

## Implementation Details

### 1. Database Schema Changes

All models now include an `isDeleted` Boolean field with default value `false`:

```prisma
model User {
  // ... other fields
  isDeleted Boolean @default(false)
  // ... rest of model
}
```

### 2. Base Service

Created `BaseService` class that all services extend:

```typescript
// src/common/base.service.ts
export abstract class BaseService {
  constructor(protected prisma: PrismaService) {}

  protected addSoftDeleteFilter(where: any = {}) {
    return { ...where, isDeleted: false };
  }

  protected async softDelete(model: string, id: string) {
    return this.prisma[model].update({
      where: { id },
      data: { isDeleted: true, updatedAt: new Date() }
    });
  }
}
```

### 3. Service Updates

All services now extend `BaseService` and implement soft delete:

#### Example: User Service
```typescript
export class UserService extends BaseService {
  constructor(
    protected readonly prisma: PrismaService,
    private mailService: MailService,
  ) {
    super(prisma);
  }

  // GET operations filter out deleted records
  async getEmployersWithDetails(search = '', page = 1, limit = 10) {
    const where: Prisma.UserWhereInput = this.addSoftDeleteFilter({
      role: 'employer',
      // ... other conditions
    });
    // ... rest of method
  }

  // DELETE operations use soft delete
  async deleteJobSeeker(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user || user.role !== 'job_seeker') {
      throw new NotFoundException('Job seeker not found or invalid role');
    }
    await this.softDelete('user', id);
    return { message: 'Job seeker deleted successfully' };
  }
}
```

## Updated Services

The following services have been updated with soft delete functionality:

1. **UserService** - Users, JobSeekers, Employers
2. **JobService** - Job postings
3. **ApplicationService** - Job applications
4. **JobCategoryService** - Job categories
5. **BannerService** - Banner management
6. **PosterService** - Poster management
7. **NotificationService** - Notifications
8. **InterviewService** - Interview records
9. **SubscriptionService** - Subscription records

## API Behavior

### GET Requests
- Only return records where `isDeleted = false`
- Existing API endpoints work without changes
- No deleted records appear in listings or searches

### DELETE Requests
- Mark records as deleted (`isDeleted = true`)
- Records remain in database for recovery
- Return success message as before

### Example Usage

```typescript
// Before (hard delete)
await this.prisma.user.delete({ where: { id } });

// After (soft delete)
await this.softDelete('user', id);

// GET requests automatically filter deleted records
const users = await this.prisma.user.findMany({
  where: this.addSoftDeleteFilter({ role: 'employer' })
});
```

## Migration

Run the following to update your database:

```bash
cd server
npx prisma migrate dev --name add_soft_delete_fields
```

## Benefits

1. **Data Recovery** - Deleted records can be restored
2. **Audit Trail** - Maintain history of all operations
3. **Referential Integrity** - Related records remain intact
4. **Compliance** - Meet data retention requirements
5. **Performance** - No cascade deletes needed

## Restore Functionality

To restore deleted records, update `isDeleted` to `false`:

```typescript
async restore(id: string) {
  return this.prisma.model.update({
    where: { id },
    data: { isDeleted: false }
  });
}
```

## Notes

- All existing API endpoints continue to work as expected
- Frontend applications require no changes
- Database queries automatically filter deleted records
- Soft delete is applied consistently across all models