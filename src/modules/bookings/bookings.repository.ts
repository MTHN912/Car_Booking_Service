import { Injectable } from '@nestjs/common';
import { Booking, Prisma, BookingStatus } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BookingUncheckedCreateInput): Promise<Booking> {
    return this.prisma.booking.create({
      data,
    });
  }

  async findAll(): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      include: {
        services: {
          include: { service: true },
        },
        user: true,
        store: true,
      },
    });
  }

  async findByUser(userId: string): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        services: {
          include: { service: true },
        },
        store: true,
      },
    });
  }

  async updateStatus(bookingId: string, status: BookingStatus): Promise<Booking> {
    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: {
        services: { include: { service: true } },
        user: true,
        store: true,
      },
    });
  }

  async cancelBooking(bookingId: string, userId: string): Promise<Booking | null> {
    const booking = await this.prisma.booking.findFirst({
      where: { id: bookingId, userId, status: { in: ['PENDING', 'CONFIRMED'] } },
    });

    if (!booking) return null;

    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
      include: {
        services: { include: { service: true } },
        user: true,
        store: true,
      },
    });
  }

  async findUsersWithBookings() {
    return this.prisma.user.findMany({
      where: {
        bookings: { some: {} },
      },
      include: {
        bookings: {
          include: {
            services: { include: { service: true } },
            store: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        services: { include: { service: true } },
        store: true,
      },
    });
  }

  async findById(bookingId: string) {
    return this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        services: { include: { service: true } },
        user: true,
        store: true,
      },
    });
  }

  async findByStoreId(storeId: string) {
    return this.prisma.booking.findMany({
      where: { storeId },
      include: {
        services: { include: { service: true } },
        user: true,
      },
    });
  }
}
