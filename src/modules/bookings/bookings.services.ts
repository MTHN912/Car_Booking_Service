import { Injectable } from '@nestjs/common';
import { BookingRepository } from './bookings.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingTransform } from './dto/booking.dto';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateBookingDto, userId: string) {
    const bookingData = BookingTransform.toPrismaInput({
    ...dto,
    userId,
  });

    const booking = await this.prisma.$transaction(async (tx) => {
      const created = await this.bookingRepository.create(bookingData);

      if (dto.services?.length) {
        await tx.bookingService.createMany({
          data: dto.services.map((serviceId) => ({
            bookingId: created.id,
            serviceId,
          })),
        });
      }

      return created;
    });

    return {
      message: 'Tạo booking thành công',
      data: booking,
    };
  }
}
