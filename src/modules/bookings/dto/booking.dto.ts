import { Prisma } from '@prisma/client';
import { CreateBookingDto } from './create-booking.dto';

export interface CreateBookingInput extends CreateBookingDto {
  userId: string;
}
export class BookingTransform {
  static toPrismaInput(input: CreateBookingInput): Prisma.BookingUncheckedCreateInput {
    const scheduledAt = new Date(`${input.date}T${input.time}:00`);

    return {
      storeId: input.storeId,
      userId: input.userId,
      name: input.name,
      phone: input.phone,
      email: input.email,
      carModel: input.carModel,
      km: input.km ? parseInt(input.km, 10) : null,
      licensePlate: input.licensePlate,
      province: input.province,
      district: input.district,
      locationType: input.locationType,
      scheduledAt,
      notes: input.notes ?? null,
    };
  }
}
