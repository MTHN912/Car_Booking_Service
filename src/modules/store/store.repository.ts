import { Injectable } from '@nestjs/common';
import { Prisma, Store } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
@Injectable()
export class StoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createWithServices(
    data: Omit<Prisma.StoreUncheckedCreateInput, 'services'>,
    services: { serviceId: string; price?: number; duration?: number }[],
    ): Promise<Store> {
      return this.prisma.store.create({
        data: {
          ...data,
          services: {
            create: services.map((s) => ({
              serviceId: s.serviceId,
              price: s.price,
              duration: s.duration,
            })),
          },
        },
        include: {
          services: {
            include: { service: true },
          },
        },
      });
  }

  async findNearby(latitude: number, longitude: number, radius: number) {
    return this.prisma.$queryRawUnsafe<any[]>(`
            SELECT
                s.store_id AS "id",
                s.store_name AS "name",
                s.address AS "address",
                s.latitude AS "latitude",
                s.longitude AS "longitude",
                (
                    6371 * 2 * asin(
                        sqrt(
                            pow(sin(radians((${latitude} - s.latitude) / 2)), 2) +
                            cos(radians(${latitude})) * cos(radians(s.latitude)) *
                            pow(sin(radians((${longitude} - s.longitude) / 2)), 2)
                        )
                    )
                ) AS "distance"
            FROM "stores" s
            WHERE (
                6371 * 2 * asin(
                    sqrt(
                        pow(sin(radians((${latitude} - s.latitude) / 2)), 2) +
                        cos(radians(${latitude})) * cos(radians(s.latitude)) *
                        pow(sin(radians((${longitude} - s.longitude) / 2)), 2)
                    )
                )
            ) < ${radius}
            ORDER BY "distance" ASC;
    `);
  }

  async findByCity(city: string) {
    return this.prisma.store.findMany({
      where: { city: { equals: city, mode: 'insensitive' } },
    });
  }

  async findAll() {
    return this.prisma.store.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.store.findUnique({
        where: { id },
    });
  }

  async upsertServicesForStore(
    storeId: string,
    services: { serviceId: string; price?: number; duration?: number; isActive?: boolean }[]
  ) {
    const ops = services.map((s) =>
      this.prisma.storeService.upsert({
        where: {
          storeId_serviceId: { storeId, serviceId: s.serviceId },
        },
        create: {
          storeId,
          serviceId: s.serviceId,
          price: s.price,
          duration: s.duration,
          isActive: s.isActive ?? true,
        },
        update: {
          price: s.price,
          duration: s.duration,
          isActive: s.isActive ?? true,
        },
      }),
    );
    await this.prisma.$transaction(ops);

    return this.prisma.store.findUnique({
      where: { id: storeId },
      include: {
        services: {
          include: { service: true },
        },
      },
    });
  }

  async getServicesByStoreId(storeId: string) {
    return this.prisma.storeService.findMany({
      where: { storeId },
      include: {
        service: true,
      },
    });
  }
}
