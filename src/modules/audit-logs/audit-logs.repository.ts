import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AuditLog, Prisma } from '@prisma/client';

@Injectable()
export class AuditLogRepository {
  constructor(private prisma: PrismaService) {}

  async createLog(data: Omit<Prisma.AuditLogCreateInput, 'id' | 'createdAt'>): Promise<AuditLog> {
    return this.prisma.auditLog.create({
      data,
    });
  }

  async findAll(): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
