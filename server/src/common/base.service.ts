import { PrismaService } from '../prisma/prisma.service';

export abstract class BaseService {
  constructor(protected prisma: PrismaService) {}

  protected addSoftDeleteFilter(where: any = {}) {
    // Check if model uses Delete_flg or isDeleted
    const hasDeleteFlg = ['job', 'jobCategory', 'companyDetails'].includes(this.getModelName());
    if (hasDeleteFlg) {
      return { ...where, Delete_flg: 0 };
    }
    return { ...where, isDeleted: { not: true } };
  }

  protected async softDelete(model: string, id: string) {
    const hasDeleteFlg = ['job', 'jobCategory', 'companyDetails'].includes(model);
    if (hasDeleteFlg) {
      return this.prisma[model].update({
        where: { id },
        data: { Delete_flg: 1, updatedAt: new Date() }
      });
    }
    return this.prisma[model].update({
      where: { id },
      data: { isDeleted: true, updatedAt: new Date() }
    });
  }

  protected getModelName(): string {
    return this.constructor.name.replace('Service', '').toLowerCase();
  }
}