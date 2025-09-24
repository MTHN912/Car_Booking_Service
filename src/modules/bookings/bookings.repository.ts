import { Injectable } from '@nestjs/common';
import { Booking, Prisma } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BookingUncheckedCreateInput): Promise<Booking> {
    return this.prisma.booking.create({
      data,
    });
  }
}
