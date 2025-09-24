import { Prisma } from '@prisma/client';
import { CreateBookingDto } from './create-booking.dto';

export class BookingTransform {
  static toPrismaInput(dto: CreateBookingDto): Prisma.BookingUncheckedCreateInput {
    const scheduledAt = new Date(`${dto.date}T${dto.time}:00`);

    return {
      storeId: dto.storeId,
      userId: dto.userId,
      name: dto.name,
      phone: dto.phone,
      email: dto.email,
      carModel: dto.carModel,
      km: dto.km ? parseInt(dto.km, 10) : null,
      licensePlate: dto.licensePlate,
      province: dto.province,
      district: dto.district,
      locationType: dto.locationType,
      scheduledAt,
      notes: dto.notes ?? null,
    };
  }
}
