import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ServiceCategory } from '@prisma/client';

@Injectable()
export class ServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ServiceCreateInput) {
    return this.prisma.service.create({ data });
  }

  async findAll() {
    return this.prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCategory(category: ServiceCategory) {
    return this.prisma.service.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' },
    });
  }
}
