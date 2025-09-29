import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../common/prisma/prisma.service';
import { BookingRepository } from './bookings.repository';
import { BookingResponseDto } from './dto/booking-response.dto';
import { BookingTransform } from './dto/booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import {UserResponseDto} from '../users/dto/user-response.dto';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateBookingDto, userId: string, storeId: string) {
    const bookingData = BookingTransform.toPrismaInput({
      ...dto,
      userId,
      storeId,
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
      booking: plainToInstance(BookingResponseDto, booking, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async findAll() {
    const bookings = await this.bookingRepository.findAll();
    return plainToInstance(BookingResponseDto, bookings, {
        excludeExtraneousValues: true,
      });
  }

  async findByUser(userId: string) {
    const bookings = await this.bookingRepository.findByUser(userId);
    return plainToInstance(BookingResponseDto, bookings, {
        excludeExtraneousValues: true,
      });
  }

  async updateStatus(bookingId: string, status: BookingStatus) {
    const booking = await this.bookingRepository.updateStatus(bookingId, status);
    return {
      message: 'Cập nhật trạng thái thành công',
      booking: plainToInstance(BookingResponseDto, booking, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async cancelBooking(bookingId: string, userId: string) {
    const result = await this.bookingRepository.cancelBooking(bookingId, userId);

    if (!result) {
      throw new Error('Không thể hủy booking này');
    }

    return { message: 'Hủy booking thành công' };
  }

  async findUsersWithBookings() {
    const users = await this.bookingRepository.findUsersWithBookings();
    return plainToInstance(UserResponseDto, users, {
        excludeExtraneousValues: true,
      });
  }

  async findByUserId(userId: string) {
    const bookings = await this.bookingRepository.findByUserId(userId);
    return plainToInstance(BookingResponseDto, bookings, {
        excludeExtraneousValues: true,
      });
  }

  async findById(bookingId: string) {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) throw new NotFoundException('Không tìm thấy booking');
    return plainToInstance(BookingResponseDto, booking, {
        excludeExtraneousValues: true,
      });
  }

  async findByStoreId(storeId: string) {
    const bookings = await this.bookingRepository.findByStoreId(storeId);
    return plainToInstance(BookingResponseDto, bookings, {
        excludeExtraneousValues: true,
      });
  }
}
